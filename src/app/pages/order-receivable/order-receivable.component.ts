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
          return;
      }
        
      let currentValue: number = parseFloat(this.customerPayment.value);
      const value = this.orderReceivable.balance - currentValue;
      this.change.setValue(value);
  }

  getOrderReceivable(){

    this.orderService.GetOrderReceivable(parseInt(this.idOrder)).subscribe(resp => {
        this.orderReceivable =  resp.data;
        console.log('this.orderReceivable',this.orderReceivable);
    });
  }

  registerPayment(){
    document.getElementById("loader").style.display = "";
    
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

    });
  }

}
