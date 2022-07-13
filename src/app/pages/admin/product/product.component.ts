import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ItemCatalogue } from 'src/app/models/ItemCatalogue.model';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  frmProduct: FormGroup;
  categoryCatalog: ItemCatalogue[];
  providersCatalog: ItemCatalogue[];

  constructor(private productService: ProductsService,
    private catalogsService: CatalogsService,
    private providerService: ProvidersService,
    private fb: FormBuilder) { 
      this.createForm();
      
  }

  ngOnInit(): void {
    this.getCatalogs();
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
      category_id:  this.fb.control(0, [Validators.required]),
      provider_id:  this.fb.control(-1, [Validators.required]),
    });
  }

  get code() {
    return this.frmProduct.get('code');
  }

  get name() {
    return this.frmProduct.get('name');
  }

  get description() {
    return this.frmProduct.get('description');
  }

  get cost() {
    return this.frmProduct.get('cost');
  }

  get salePrice() {
    return this.frmProduct.get('sale_price');
  }

  get stock() {
    return this.frmProduct.get('stock');
  }

  get quantityPackage() {
    return this.frmProduct.get('quantity_package');
  }

  get quantityLump() {
    return this.frmProduct.get('quantity_lump');
  }

  get categoryId() {
    return this.frmProduct.get('category_id');
  }

  get providerId() {
    return this.frmProduct.get('provider_id');
  }

  getCatalogs(){
    this.catalogsService.getByName('categoria_productos').subscribe(resp => {
       this.categoryCatalog = resp.data.items;
       this.categoryId.setValue(this.categoryCatalog[0].id);
    });

    this.providerService.getAsCatalogue().subscribe(resp => {
      console.log(resp);
      this.providersCatalog = resp.data;
      this.providerId.setValue(resp.data[0].id);
    });
  }

  createProduct(){
    
  }

}