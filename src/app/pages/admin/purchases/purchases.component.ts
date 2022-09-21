import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemCatalogue } from 'src/app/models/ItemCatalogue.model';
import { ProductFinder } from 'src/app/models/ProductFinder.model';
import { ProductSimpleItem } from 'src/app/models/ProductItem.model';
import { Product } from 'src/app/models/Products.model';
import { PurchaseCreate } from 'src/app/models/Purchase.model';
import { ProductsService } from 'src/app/services/products.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { PurchasesService } from 'src/app/services/purchases-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  @ViewChild('content', {read: TemplateRef}) modalMain: TemplateRef<any>;
  frmPurchases: FormGroup;
  product: Product;
  currentDate: Date = new Date();
  dateIni: NgbDateStruct = { year: this.currentDate.getUTCFullYear(), month: this.currentDate.getMonth()+1, day: this.currentDate.getDate() };
  providersCatalog: ItemCatalogue[];
  products: ProductFinder[] = [];
  productsOrder: ProductFinder[] = [];
  textProductFinder = "";
  productSelected: ProductFinder;
  arrayItems: ProductSimpleItem[];
  detailsOpened: boolean = false;
  
  constructor(private fb: FormBuilder,
    private providerService: ProvidersService,
    private purchaseService: PurchasesService,
    private productService: ProductsService,
    private modalService: NgbModal) { 
        
    }
  

  ngOnInit(): void {
    this.getProviders();
    this.frmPurchases = this.getDefaultForm();
  }

  getDefaultForm(){
    return new FormGroup({
      date:  this.fb.control(this.dateIni, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      idProvider:  this.fb.control(-1, [Validators.required]),
      observations:  this.fb.control("", []),
      numInvoice: this.fb.control("", []),
      total: this.fb.control("", []),
      items: new FormArray([]),
    });
  }

  get date(){
    return this.frmPurchases.get('date');
  }

  get idProvider(){
    return this.frmPurchases.get('idProvider');
  }

  get observations(){
    return this.frmPurchases.get('observations');
  }

  get numInvoice(){
    return this.frmPurchases.get('numInvoice');
  }

  get total(){
    return this.frmPurchases.get('total');
  }

  get productItems(){
    return this.frmPurchases.get('items') as FormArray;
  }

  showOrderDetails(){
    this.detailsOpened = !this.detailsOpened;
  }

  getProviders(){
    this.providerService.getAsCatalogue().subscribe(resp => {
      console.log(resp);
      this.providersCatalog = resp.data;
      this.idProvider.setValue(resp.data[0].id);
    });
  }

  addItem(item) {
    this.arrayItems.push(item);
    this.productItems.push(this.fb.control(''));
 }

 removeItem(i: number) {
    const items = this.productItems;

    if(items.length > 1){
      items.removeAt(i);
    }else{
      items.reset();
    }
 }

 removeAllItemsProducts(){
  this.productItems.reset();
 }

 removeProduct(id: number){
    
    const items = this.productItems;
    items.removeAt(items.value.findIndex(el => el.id === id));
    
    this.productsOrder.splice(this.productsOrder.findIndex(x => x.id === id), 1);
    console.log('despues',this.productsOrder);
    this.calculateTotals();
 }


  findProduct(){
    document.getElementById("loader").style.display = "";
    
    this.productService.getByName(this.textProductFinder)
    .subscribe(resp => {
      document.getElementById("loader").style.display = "none";
      this.products = resp.data;
      
    }, (errorResp) => {
      document.getElementById("loader").style.display = "none";
      this.products = [];
      if(errorResp.status == 404){
          
      }
    });
  }

  selectedProduct(productSelected: ProductFinder){
    this.productSelected = productSelected;
    let input_prod = document.getElementById(`input_prod_${productSelected.id}`) as HTMLInputElement;
    
    if(input_prod.value.trim().length == 0){
      Swal.fire("Notificación", "No ha ingresado la cantidad de productos que desea agregar.");
      return;
    }

    if(parseInt(input_prod.value) == 0){
      Swal.fire("Notificación", "La cantidad debe ser mayor a cero.");
      return;
    }

    const _productItems = this.productItems;
    
    //verifica si ya ha sido agregado el producto
    let index = this.productsOrder.findIndex(x => x.id === this.productSelected.id);
    
    if(index > -1){ //existe producto
      const currentQuantity = this.productsOrder[index].quantity;
      const newQuantity = currentQuantity + parseInt(input_prod.value);
      this.productSelected.quantity = newQuantity;
      this.productsOrder[index].quantity = newQuantity;

      let indexFormArray =_productItems.value.findIndex((y: ProductSimpleItem) => y.id === this.productSelected.id);
      _productItems.at(indexFormArray).get('quantity').setValue(newQuantity);
    }else{
      this.productSelected.quantity = parseInt(input_prod.value);
      this.productsOrder.push(productSelected);

      const prod = this.fb.group({
        id: [productSelected.id, Validators.required],
        quantity: [parseInt(input_prod.value), Validators.required],
        price: [parseFloat(productSelected.sale_price.toString()), Validators.required]
      });

      _productItems.push(prod);
    }
    this.calculateTotals();
    this.detailsOpened = true;

    input_prod.value = "1"; //establezco el input a su valor inicial
    this.modalService.dismissAll();
}

  addProduct(){
    this.modalService.open(this.modalMain);
  }

  calculateTotals(){
    if(this.productItems.value.length == 0) return;

    let _total: number = 0;
    this.productItems.value.forEach(prod => {
        let total_line = parseFloat(prod.price) * parseInt(prod.quantity);
        _total += total_line;
    });
    this.total.setValue(_total);
  }

  NgbDateStructToString(){
    return `${this.date.value.year }-${this.date.value.month}-${this.date.value.day}`;
  }

  registerPurchase(){
      document.getElementById("loader").style.display = "";
      
      if(this.productItems.value.length == 0){
        document.getElementById("loader").style.display = "none";
        Swal.fire("Notificación", "Ingrese los productos de la compra.", "warning");
        return;
      }

      let purchase: PurchaseCreate = {
        idProvider: parseInt(this.idProvider.value),
        date: this.NgbDateStructToString(),
        numInvoice: this.numInvoice.value,
        total: parseFloat(this.total.value),
        observations: this.observations.value,
        items: this.productItems.value
      };
      
      this.purchaseService.register(purchase).subscribe(resp => {
        if(resp.success){
          Swal.fire('Notificación', 'Compra registrada correctamente.', 'success');
          this.productItems.clear();
          this.numInvoice.setValue("");
          this.observations.setValue("");
          this.productItems.setValue([]);
          this.productsOrder = [];
          this.total.setValue(0);
        }else{
          Swal.fire('Notificación', resp.message, 'warning');
        }
        document.getElementById("loader").style.display = "none";
      }, (err) => {
          console.log(err);
          Swal.fire('Notificación', err.message, 'error');
          document.getElementById("loader").style.display = "none";
      });
  }

}