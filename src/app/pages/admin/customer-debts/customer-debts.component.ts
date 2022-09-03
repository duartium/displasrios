import { Component, OnInit } from '@angular/core';
import { CustomerDebs } from 'src/app/Dtos/OrderReceivableDto.model';
import { ItemCatalogue } from 'src/app/models/ItemCatalogue.model';

@Component({
  selector: 'app-customer-debts',
  templateUrl: './customer-debts.component.html',
  styleUrls: ['./customer-debts.component.css']
})
export class CustomerDebtsComponent implements OnInit {

  searchType: ItemCatalogue[] = [
    { id: 1, description: "CÉDULA"},
    { id: 2, description: "NOMBRES"}
  ];
  names: string = "";
  identification: string = "";
  searchTypeSelected: number = 1;
  customerDebs: CustomerDebs[];

  constructor() { 

  }

  ngOnInit(): void {
  }

}
