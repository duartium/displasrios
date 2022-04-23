import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-receivable',
  templateUrl: './order-receivable.component.html',
  styleUrls: ['./order-receivable.component.css']
})
export class OrderReceivableComponent implements OnInit {

  idOrder: string;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.idOrder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  goToBack(){
    this.router.navigate(['/pedidos-cobrar']);
  }

}
