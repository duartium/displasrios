import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SummaryOrderOfDay } from 'src/app/Dtos/OrderReceivableDto.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-of-day',
  templateUrl: './orders-of-day.component.html',
  styleUrls: ['./orders-of-day.component.css']
})
export class OrdersOfDayComponent implements OnInit {

  summaryOrders: SummaryOrderOfDay[];
  constructor(private orderService: OrderService,
    private router: Router) { }

  ngOnInit(): void {
    this.getSummaryOrdersOfDay();
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
    console.log('pok');
  }

}
