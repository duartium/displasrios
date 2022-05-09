import { Component, OnInit } from '@angular/core';
import { SummaryOrderOfDay } from 'src/app/Dtos/OrderReceivableDto.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-of-day',
  templateUrl: './orders-of-day.component.html',
  styleUrls: ['./orders-of-day.component.css']
})
export class OrdersOfDayComponent implements OnInit {

  summaryOrders: SummaryOrderOfDay[];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getSummaryOrdersOfDay();
  }

  getSummaryOrdersOfDay(){
    this.orderService.GetSummaryOrdersOfDay().subscribe(resp => {
      console.log(resp);
        if(resp.success){
            this.summaryOrders = resp.data;
            
        }
    });
  }

}
