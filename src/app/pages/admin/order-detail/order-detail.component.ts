import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullOrderReceivable } from 'src/app/Dtos/OrderReceivableDto.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  idOrder: number = 0;
  order: FullOrderReceivable;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService) { 
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    if(id == 'undefined' || id.trim().length === 0)
      this.router.navigateByUrl('/pagina-no-encontrada');
    
      this.idOrder = parseInt(id);
      
  }

  ngOnInit(): void {
    this.GetOrderById(this.idOrder);
  }

  GetOrderById(id: number){
    this.orderService.GetOrderReceivable(id).subscribe(resp => {
        this.order = resp.data;
        console.log(this.order);
    });
  }



}
