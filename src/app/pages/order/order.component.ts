import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  modalTitle = 'Buscar cliente';
  frmOrder = this.fb.group({
    id_client:  this.fb.control('', [Validators.required, Validators.minLength(3)]),
    efectivo:  this.fb.control('', [Validators.required, Validators.minLength(3)]),
    transferencia:  this.fb.control('', [Validators.required, Validators.minLength(3)]),
    descuento:  this.fb.control('', [Validators.required, Validators.minLength(3)]),
    cliente_paga:  this.fb.control('', [Validators.required, Validators.minLength(3)]),
  });

  catalogs = [];
  constructor(private customerService: CustomersService,
    private fb: FormBuilder) { 
       this.catalogs = JSON.parse(localStorage.getItem('catalogs'));
       console.log(this.catalogs);
    }

  ngOnInit(): void {
  }

  getByIdentification(){
    this.customerService.getByIdentification('123123').subscribe(resp => {
        console.log('SOY RESP', resp);
      }
    );
  }

  getCustomer(){
     
  }

  addProduct(){

  }

  showFinder(){
    $("#modal-body").html("<input type='text' class='form-control search-input' placeholder='Cédula o nombres' formControlName='textSearchClient' autofocus>");
    $("#main-modal").modal("show");
  }

}
