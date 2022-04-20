import { Component, Input, OnInit } from '@angular/core';
import { OrderReceivableDto } from 'src/app/Dtos/OrderReceivableDto.model';

@Component({
  selector: 'app-order-receivable-cardbox',
  templateUrl: './order-receivable-cardbox.component.html',
  styleUrls: ['./order-receivable-cardbox.component.css']
})
export class OrderReceivableCardboxComponent implements OnInit {
  @Input() ordersReceivable: OrderReceivableDto[];
  constructor() {
    console.log('ordersReceivable', this.ordersReceivable);
   }

  ngOnInit(): void {
  }

}
