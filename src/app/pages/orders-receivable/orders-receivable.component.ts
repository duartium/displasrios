import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderReceivableDto } from 'src/app/Dtos/OrderReceivableDto.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-receivable',
  templateUrl: './orders-receivable.component.html',
  styleUrls: ['./orders-receivable.component.css']
})
export class OrdersReceivableComponent implements OnInit {

  
  tipo_busqueda: string = "todos";
  frmFiltersOrdersReceivable: FormGroup;  
  ordersReceivable: OrderReceivableDto[];

  constructor(fb: FormBuilder,
    private orderService: OrderService) { 

    this.frmFiltersOrdersReceivable = fb.group({
        identification: fb.control(''),
        names: fb.control(''),
        order_number: fb.control('')
    });
    this.GetOrdersReceivable();
    
  }

  ngOnInit(): void {
  }

  GetOrdersReceivable(){
    this.orderService.GetOrdersReceivable().subscribe(resp => {
        console.log(resp);
        this.ordersReceivable = resp.data;
    });
  }
  

}
