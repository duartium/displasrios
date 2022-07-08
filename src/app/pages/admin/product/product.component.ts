import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  frmProduct: FormGroup;

  constructor(private productService: ProductsService,
    private fb: FormBuilder) { 
      this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.frmProduct = this.fb.group({
      code:  this.fb.control("", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      name:  this.fb.control("", [Validators.required, Validators.minLength(3)]),
      description:  this.fb.control("", []),
      cost:  this.fb.control(0, [Validators.required]),
      sale_price:  this.fb.control(0, [Validators.required]),
      stock:  this.fb.control(0, [Validators.required]),
      quantity_package:  this.fb.control(0, [Validators.required]),
      quantity_lump:  this.fb.control(0, [Validators.required]),
      discount:  this.fb.control(0, []),
      tarifa_id:  this.fb.control(0, []),
      category_id:  this.fb.control(-1, [Validators.required]),
      provider_id:  this.fb.control(-1, [Validators.required]),
    });
  }

  createProduct(){
    
  }

}