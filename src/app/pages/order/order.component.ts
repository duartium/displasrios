import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, FormGroup } from '@angular/forms';
import { CustomerFinder } from 'src/app/models/CustomerFinder.model';
import { ProductFinder } from 'src/app/models/ProductFinder.model';
import { CustomersService } from 'src/app/services/customers.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { FullOrderDto } from 'src/app/Dtos/FullOrderDto.model';
import { ProductOrderDetail } from 'src/app/models/Product.model';

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
  //fullOrderDto: FullOrderDto;
  quantity_cart: number = 0;

  frmOrder: FormGroup;

  catalogs = [];
  constructor(private customerService: CustomersService,
    private fb: FormBuilder,  private productService: ProductsService,
    private toastr: ToastrService) { 
        
      this.frmOrder = this.fb.group({
        id_client:  this.fb.control('', [Validators.required, Validators.minLength(3)]),
        customer_payment:  this.fb.control('0.00', [Validators.required, Validators.minLength(1)]),
        items: this.fb.array([]),
        change: 0,
        payment_method:  this.fb.control('1', [Validators.required]),
        payment_mode:  this.fb.control('2', [Validators.required]),
        discount:  this.fb.control('0.00', [Validators.required]),
        subtotal: 0,
        iva: 0,
        total: 0
      });
      //this.initialize();
    }

    // initialize(): void{
    //   this.fullOrderDto = {
    //     id_client: 0,
    //     items: [],
    //     payment_method: 0,
    //     payment_mode: 0,
    //     customer_payment: 0,
    //     change: 0,
    //     discount: 0,
    //     subtotal: 0,
    //     iva: 0,
    //     total: 0
    //   }
    // }

  ngOnInit(): void {

  }


  calculateTotals(){
    this.quantity_cart = 0;
    
    console.log('INI CALCULATE', this.frmOrder.value);
    this.frmOrder.value.items.forEach(prod => {
      console.log(prod); 
        this.quantity_cart += prod.value.quantity,
        this.frmOrder.value.subtotal = parseFloat(this.frmOrder.value.subtotal) + parseFloat(prod.value.price)
    });
    this.frmOrder.value.total = this.frmOrder.value.subtotal;
    console.log('FIN CALCULATE', this.frmOrder.value);
    // this.setOrderChange();
    // this.applyDiscount();

  }

  setOrderChange(changeValue: string){
      let currentValue: number = parseFloat(changeValue);
      console.log('SETORDERCHANGE', this.frmOrder.value);

      if(currentValue > parseFloat(this.frmOrder.value.total)){
        this.frmOrder.value.change = currentValue - parseFloat(this.frmOrder.value.total);
      }
  }

  applyDiscount(){
    //if(this.fullOrderDto.discount === 0) return;
    console.log('APPLYDISCOUNT', this.frmOrder.value.discount);
    this.frmOrder.value.total = this.frmOrder.value.subtotal - this.frmOrder.value.discount;
  }

  changeFilterCustomer(e){
      this.textClientFinder = "";
      this.customers = [];
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
    document.getElementById("loader").style.display = "";
    this.productService.getByName(this.textProductFinder)
    .subscribe(resp => {
      this.products = resp.data;
      
      document.getElementById("loader").style.display = "none";
    }, (errorResp) => {
      document.getElementById("loader").style.display = "none";
      this.products = [];
      if(errorResp.status == 404){
          
      }
    });
  }

  selectedClient(customerSelected: CustomerFinder){
      this.detailsOpened = true;
      this.customerSelected = customerSelected;
      this.frmOrder.value.id_client = customerSelected.id;
      $("#main-modal").modal("hide");
  }

  selectedProduct(productSelected: ProductFinder){
      this.productSelected = productSelected;
      this.productsOrder.push(productSelected);
      console.log(productSelected);
      // const prod: ProductOrderDetail = {
      //   id: productSelected.id,
      //   quantity: 1,
      //   price: productSelected.sale_price
      // } 
      const prod = this.fb.group({
        id: [productSelected.id, Validators.required],
        quantity: [1, Validators.required],
        price: [productSelected.sale_price, Validators.required]
    });

      console.log(this.frmOrder.value);
      this.frmOrder.value.items.push(prod);
      this.calculateTotals();
      $("#main-modal").modal("hide");
  }

  addProduct(){
    
    this.modalTitle = "Buscar Producto";
    this.finder = "product";
    $("#main-modal").modal("show");
    //this.toastr.success('Hello world!', 'Toastr fun!');

  }

  showFinder(){
    this.modalTitle = "Buscar Cliente";
    this.finder = "customer";
    $("#main-modal").modal("show");
  }

  orderRegister(){
    if(!this.frmOrder.valid){
      this.frmOrder.markAllAsTouched();
      alert('form invalido');
      return;
    }
  }

}
