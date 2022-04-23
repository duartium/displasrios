import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderReceivableDto } from 'src/app/Dtos/OrderReceivableDto.model';

@Component({
  selector: 'app-order-receivable-cardbox',
  templateUrl: './order-receivable-cardbox.component.html',
  styleUrls: ['./order-receivable-cardbox.component.css']
})
export class OrderReceivableCardboxComponent implements OnInit {
  @Input() ordersReceivable: OrderReceivableDto[];
  constructor(private router: Router) {
    console.log('ordersReceivable', this.ordersReceivable);
   }

  ngOnInit(): void {
  }

  goToDetail(id: string){
    this.router.navigate(['/pedido-cobrar', id]);
  }

}
