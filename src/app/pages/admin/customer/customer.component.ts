import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemCatalogue } from 'src/app/models/ItemCatalogue.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  frmCustomer: FormGroup;
  
  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.frmCustomer = this.fb.group({
      identification: this.fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      type: this.fb.control('', [Validators.required]),
      ident_type: this.fb.control('C', [Validators.required]),
      names: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      surnames: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      phone_number: this.fb.control('', [Validators.required, Validators.minLength(9), Validators.pattern('[0-9]')]),
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  get identification(){
    return this.frmCustomer.get('identification');
  }

  get type(){
    return this.frmCustomer.get('type');
  }

  get ident_type(){
    return this.frmCustomer.get('ident_type');
  }

  get names(){
    return this.frmCustomer.get('names');
  }

  get surnames(){
    return this.frmCustomer.get('surnames');
  }

  get phone(){
    return this.frmCustomer.get('phone_number');
  }

  get email(){
    return this.frmCustomer.get('email');
  }

  createCustomer(){

  }
}
