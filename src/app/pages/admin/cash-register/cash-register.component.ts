import { Component, OnInit } from '@angular/core';
import { CashRegisterService } from 'src/app/services/cash-register.service';

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.css']
})
export class CashRegisterComponent implements OnInit {

  constructor(private cashRegisterService: CashRegisterService) { 

  }
  active = 1;
  isOpenendCash: boolean;

  ngOnInit(): void {
    this.isOpenedCash();
  }

  openCashRegister(){

  }

  isOpenedCash(){
    this.cashRegisterService.isOpenedCash().subscribe(resp => {
        this.isOpenendCash = resp.data;
        console.log(resp);
    });
  }

}
