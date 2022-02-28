import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private customerService: CustomersService,
    private tokenService: TokenService) { 
      this.getCustomers();
    }

  ngOnInit(): void {
  }

  
  getCustomers(){
    const token = this.tokenService.getToken();
      console.log(token);
      this.customerService.getAll(token)
      .subscribe(customers => {
        console.log(customers);
      });
  }

}
