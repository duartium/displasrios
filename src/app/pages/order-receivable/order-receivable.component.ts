import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FullOrderReceivable, OrderPaymentRequest } from 'src/app/Dtos/OrderReceivableDto.model';
import { VisitCreation } from 'src/app/models/VisitCreation.model';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-receivable',
  templateUrl: './order-receivable.component.html',
  styleUrls: ['./order-receivable.component.css']
})
export class OrderReceivableComponent implements OnInit, AfterViewInit{
  @ViewChild('orderConfig') orderConfig: ElementRef;

  modalTitle: string = "PAGOS";
  detailsOpened: boolean = false;
  idOrder: string;
  frmOrderReceivable: FormGroup;
  orderReceivable: FullOrderReceivable;
  orderPaymentRequest: OrderPaymentRequest;
  pendingBalance: number;
  currentScreen: 'PAYMENT' | 'VISIT' = 'PAYMENT';
  observations: string = '';

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService,
    private render: Renderer2) { 
      
      this.frmOrderReceivable = fb.group({
        id_invoice: fb.control(0, [Validators.required]),
        change: fb.control(0, [Validators.required]),
        customer_payment: fb.control(0, [Validators.required]),
      });

      this.idOrder = this.activatedRoute.snapshot.paramMap.get('id');
      this.getOrderReceivable();
      
    }
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    
    this.frmOrderReceivable.get('id_invoice').setValue(this.idOrder);
    
  }

  get change(){
    return this.frmOrderReceivable.get('change');
  }

  get customerPayment(){
    return this.frmOrderReceivable.get('customer_payment');
  }

  goToBack(){
    this.router.navigate(['/pedidos-cobrar']);
  }

  showOrderDetails(){
    this.detailsOpened = !this.detailsOpened;
  }

  showMenuConfig(){
    if((this.orderConfig.nativeElement as HTMLElement).style.display === 'block'){
      this.render.setStyle(this.orderConfig.nativeElement, 'display', 'none');
      this.render.setStyle(this.orderConfig.nativeElement, 'opacity', 0);
    }else{
      this.render.setStyle(this.orderConfig.nativeElement, 'display', 'block');
      this.render.setStyle(this.orderConfig.nativeElement, 'opacity', 1);
    }
  }

  showModal(){
    
    $("#main-modal").modal("show");
  }

  setOrderChange(){
      if(this.customerPayment.value.length == 0){
          this.change.setValue(0);
          this.pendingBalance = 0;
          return;
      }
        
      let currentValue: number = parseFloat(this.customerPayment.value);
      
      const value = Math.abs(currentValue - this.orderReceivable.balance);

      if(currentValue >= this.orderReceivable.balance){//pago con vuelto
        this.pendingBalance = 0;
        this.orderReceivable.balance
        this.change.setValue(value);
      }else{ //pago con saldo pendiente
        this.pendingBalance = value;
      }
      
  }

  clearWhenIsZero(){
    if(this.customerPayment.value == "0")
      this.customerPayment.setValue("");
  }

  registerVisit(){

    if(this.observations.trim().length === 0){
      Swal.fire('Notificación', 'Ingrese las observaciones de la visita para registrarla.', 'warning');
      return;
    }

    document.getElementById("loader").style.display = "";

    const visit: VisitCreation = { id_order: parseInt(this.idOrder),  observations: this.observations};
    
    this.orderService.RecordVisit(visit).subscribe(resp => {
      if(resp.success){
        Swal.fire({ title: "Notificación", text: "Se registró la visita", icon: "success"})
        .then(resp => {
            this.goToBack();
        });
      }else{
        Swal.fire("Notificación",resp.message,"warning");
      }

      document.getElementById("loader").style.display = "none";

    }, (err) => {
      document.getElementById("loader").style.display = "none";
        Swal.fire('Notificación', err.message, 'error');
    });
  }

  getOrderReceivable(){

    this.orderService.GetOrderReceivable(parseInt(this.idOrder)).subscribe(resp => {
        this.orderReceivable =  resp.data;
        console.log('resp.data',resp.data);
        this.pendingBalance = this.orderReceivable.balance;
    });
  }

  cancelOrder(){
    Swal.fire({
      title: '¿Está seguro de anular el pedido?',
      showDenyButton: true,
      confirmButtonText: 'Sí, anular',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {

        this.orderService.CancelOrder(this.idOrder).subscribe(resp => {
          if(resp.success){
            Swal.fire('¡Pedido Anulado!', '', 'success')
            .then(() => {
              this.goToBack();
            });
          }else{
            Swal.fire('Error', 'No se pudo cancelar el pedido: '+resp.message, 'warning');
          }
        }, (err) => {
          Swal.fire('Error', 'No se pudo cancelar el pedido: '+err.message, 'error');
        });

      
      }
      this.showMenuConfig();
    })
  }

  registerPayment(){
    document.getElementById("loader").style.display = "";
    
    if(this.frmOrderReceivable.invalid || this.customerPayment.value == "" || parseFloat(this.customerPayment.value) == 0){
      document.getElementById("loader").style.display = "none";
      Swal.fire('Notificación', 'Datos inválidos. Registre el valor que paga el cliente para continuar.', 'warning');
      return;
    }

    this.orderPaymentRequest = {
      customer_payment: Math.round(parseFloat(this.customerPayment.value)),
      id_order: parseInt(this.idOrder),
      change: Math.round(parseFloat(this.change.value))
    }
    console.log('this.orderPaymentRequest', this.orderPaymentRequest);
    this.orderService.registerPayment(this.orderPaymentRequest).subscribe(resp => {
      console.log('registerPayment', resp);
      document.getElementById("loader").style.display = "none";
        if(resp.success){
            Swal.fire({ title: "Venta Cerrada", text: resp.message, icon: "success"})
            .then(resp => {
                this.goToBack();
            });
        }else{
          Swal.fire({ title: "Cobro Recibido", text: resp.message, icon: "error"})
            .then(resp => {
                this.goToBack();
            });
        }

    }, (err) => {
        document.getElementById("loader").style.display = "none";
        Swal.fire('Notificación', err.message, 'error');
    });
  }

}