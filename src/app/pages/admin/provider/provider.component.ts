import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  frmProvider: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.createForm();

  }

  ngOnInit(): void {
  }

  createForm(){
    this.frmProvider = this.fb.group({
      ruc: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      address: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.email]),
      phone: this.fb.control('', [Validators.required, Validators.minLength(3)])
    });
  }

  createProvider(){
    console.log('SUBMIT');
  }

}
