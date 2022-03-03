import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule } from '@angular/forms';
import { pipe } from 'rxjs';
import { CustomerFinder } from 'src/app/models/CustomerFinder.model';
import { ProductFinder } from 'src/app/models/ProductFinder.model';
import { CustomersService } from 'src/app/services/customers.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  finder = 'customer';
  filterClientFinder = "identification";
  textClientFinder = "";
  textProductFinder = "";
  modalTitle = 'Buscar cliente';
  customerSelected: CustomerFinder;
  productSelected: ProductFinder;
  customers: CustomerFinder[] = [];
  products: ProductFinder[] = [];
  productsOrder: ProductFinder[] = [];
  detailsOpened: boolean = false;

  frmOrder = this.fb.group({
    id_client:  this.fb.control('', [Validators.required, Validators.minLength(3)]),
    payment_method:  this.fb.control('1', [Validators.required]),
    payment_mode:  this.fb.control('2', [Validators.required]),
    discount:  this.fb.control('0.00', [Validators.required]),
    cliente_paga:  this.fb.control('0.00', [Validators.required, Validators.minLength(1)]),
  });

  catalogs = [];
  constructor(private customerService: CustomersService,
    private fb: FormBuilder,
    private productService: ProductsService) { 
    }

  ngOnInit(): void {
  }

  getCustomer(){
     
  }

  changeFilterCustomer(e){
      this.textClientFinder = "";
      this.customers = [];
  }

  getProducts(){
    
  }

  showOrderDetails(){
      this.detailsOpened = !this.detailsOpened;
  }

  findCustomer(){

      if(this.filterClientFinder === "identification"){
        this.customerService.getByIdentification(this.textClientFinder)
        .subscribe(resp => {
          this.customers.push(resp.data);
        }, (errorResp) => {
          this.customers = [];
          if(errorResp.status == 404){
              
          }
        });

      }else{
        
        this.customerService.getByNames(this.textClientFinder)
        .subscribe(resp => {
          console.log(resp);
          this.customers = resp.data;
        });
      }
  }

  findProduct(){

    this.productService.getByName(this.textProductFinder)
    .subscribe(resp => {
      console.log(resp);
      this.products = resp.data;
    }, (errorResp) => {
      this.products = [];
      if(errorResp.status == 404){
          
      }
    });
  }

  selectedClient(customerSelected: CustomerFinder){
      this.detailsOpened = true;
      this.customerSelected = customerSelected;
      $("#main-modal").modal("hide");
  }

  selectedProduct(productSelected: ProductFinder){
      this.productSelected = productSelected;
      this.productsOrder.push(productSelected);
      $("#main-modal").modal("hide");
  }

  addProduct(){
    this.modalTitle = "Buscar Producto";
    this.finder = "product";
    $("#main-modal").modal("show");
  }

  showFinder(){
    this.modalTitle = "Buscar Cliente";
    this.finder = "customer";
    $("#main-modal").modal("show");
  }

}
