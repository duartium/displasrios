import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FullOrderReceivable, OrderPaymentRequest } from 'src/app/Dtos/OrderReceivableDto.model';
import { Payment } from 'src/app/models/Payment.model';
import { OrderService } from 'src/app/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-receivable',
  templateUrl: './order-receivable.component.html',
  styleUrls: ['./order-receivable.component.css']
})
export class OrderReceivableComponent implements OnInit {

  modalTitle: string = "PAGOS";
  detailsOpened: boolean = false;
  idOrder: string;
  frmOrderReceivable: FormGroup;
  orderReceivable: FullOrderReceivable;
  orderPaymentRequest: OrderPaymentRequest;
  pendingBalance: number;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService) { 
      

      this.frmOrderReceivable = fb.group({
        id_invoice: fb.control(0, [Validators.required]),
        change: fb.control(0, [Validators.required]),
        customer_payment: fb.control(0, [Validators.required]),
      });

      this.idOrder = this.activatedRoute.snapshot.paramMap.get('id');
      this.getOrderReceivable();
      
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

  getOrderReceivable(){

    this.orderService.GetOrderReceivable(parseInt(this.idOrder)).subscribe(resp => {
        this.orderReceivable =  resp.data;
        console.log('this.orderReceivable',this.orderReceivable);
        this.pendingBalance = this.orderReceivable.balance;
    });
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