import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FullOrderReceivable } from 'src/app/Dtos/OrderReceivableDto.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-receivable',
  templateUrl: './order-receivable.component.html',
  styleUrls: ['./order-receivable.component.css']
})
export class OrderReceivableComponent implements OnInit {

  detailsOpened: boolean = false;
  idOrder: string;
  frmOrderReceivable: FormGroup;
  balance: number = 0;
  orderReceivable: FullOrderReceivable;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService) { 

      this.frmOrderReceivable = fb.group({
        change: fb.control(0, [Validators.required]),
        customer_payment: fb.control(0, [Validators.required]),
        id_invoice: fb.control(0, [Validators.required]),
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

  chargeBalance(){
    
  }

  getOrderReceivable(){
    this.orderService.GetOrderReceivable(parseInt(this.idOrder)).subscribe(resp => {
        this.orderReceivable =  resp.data;
        console.log('this.orderReceivable',this.orderReceivable);
    });
  }

}
