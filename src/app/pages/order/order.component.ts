import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  catalogs = [];
  constructor(private customerService: CustomersService) { 
       this.catalogs = JSON.parse(localStorage.getItem('catalogs'));
       console.log(this.catalogs);
    }

  ngOnInit(): void {
  }

  
  getCustomer(){
     
  }

}
