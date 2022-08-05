import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer.model';
import { CustomerFinder } from 'src/app/models/CustomerFinder.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  constructor(private customerService: CustomersService) { 
    this.getCustomers();

  }

  ngOnInit(): void {
  }

  getCustomers(){
    this.customerService.getAll().subscribe(resp => {
      console.log(resp);
        this.customers = resp.data;
    });
  }

}
