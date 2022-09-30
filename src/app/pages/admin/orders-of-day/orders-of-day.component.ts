import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SummaryOrderOfDay } from 'src/app/Dtos/OrderReceivableDto.model';
import { OrderService } from 'src/app/services/order.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-orders-of-day',
  templateUrl: './orders-of-day.component.html',
  styleUrls: ['./orders-of-day.component.css']
})
export class OrdersOfDayComponent implements OnInit {

  summaryOrders: SummaryOrderOfDay[];
  constructor(private orderService: OrderService,
    private router: Router,
    private signalrService: SignalrService) { }

  ngOnInit(): void {
    this.getSummaryOrdersOfDay();
    this.signalrService.eventNotifica.subscribe((newOrder: SummaryOrderOfDay) => {
      console.log('newOrder', newOrder);
      let newSummaryOrders = [...this.summaryOrders];
      newSummaryOrders.unshift(newOrder);
      this.summaryOrders = newSummaryOrders;
      console.log('summaryOrders', this.summaryOrders);
    });
  }

  getSummaryOrdersOfDay(){
    this.orderService.GetSummaryOrdersOfDay().subscribe(resp => {
        if(resp.success){
            this.summaryOrders = resp.data;
            console.log(resp.data);
        }
    });
  }

  GoToOrder(id: number){
    this.router.navigate(['/admin/pedido/'+id]);
  }


}
