import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, FormGroup, FormArray } from '@angular/forms';
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
  arrayItems: {
    id: number,
    quantity: number,
    price: number
  }[];

  frmOrder: FormGroup;

  catalogs = [];

  constructor(private customerService: CustomersService,
    private fb: FormBuilder,  private productService: ProductsService,
    private toastr: ToastrService) { 
        
      this.frmOrder = this.fb.group({
        id_client:  this.fb.control('', [Validators.required]),
        items: this.fb.array([]),
        customer_payment:  this.fb.control('0', [Validators.required, Validators.minLength(1)]),
        change: this.fb.control('0', [Validators.required]),
        payment_method:  this.fb.control('1', [Validators.required]),
        payment_mode:  this.fb.control('2', [Validators.required]),
        discount:  this.fb.control('0', [Validators.required]),
        subtotal: this.fb.control('0', [Validators.required]),
        iva: this.fb.control('0', [Validators.required]),
        total: this.fb.control('0', [Validators.required])
      });
    }

  ngOnInit(): void {
      // this.frmOrder.valueChanges
      // .subscribe(value => {
      //   console.log(value);
      // });
  }

  get idClient(){
    return this.frmOrder.get('id_client');
  }

  get customerPayment(){
    return this.frmOrder.get('customer_payment');
  }

  get discount(){
    return this.frmOrder.get('discount');
  }

  get change(){
    return this.frmOrder.get('change');
  }

  get subtotal(){
    return this.frmOrder.get('subtotal');
  }

  get productItems(){
    return this.frmOrder.get('items') as FormArray;
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

  get total(){
    return this.frmOrder.get('total');
  }

  calculateTotals(){
    this.quantity_cart = 0;
    
    console.log('INI CALCULATE', this.frmOrder.value);
    this.productItems.value.forEach(prod => {
        this.quantity_cart += parseInt(prod.quantity),
        this.subtotal.setValue(parseFloat(this.subtotal.value) + parseFloat(prod.price));
    });
    this.total.setValue(this.subtotal.value);
    console.log('FIN CALCULATE', this.frmOrder.value);
    // this.setOrderChange();
    // this.applyDiscount();

  }

  setOrderChange(changeValue: string){
      let currentValue: number = parseFloat(changeValue);
      console.log('SETORDERCHANGE', this.frmOrder.value);

      if(currentValue > parseFloat(this.total.value)){
        this.change.setValue(currentValue - parseFloat(this.total.value));
      }
  }

  applyDiscount(){
    //if(this.fullOrderDto.discount === 0) return;
    console.log('APPLYDISCOUNT', this.discount);
    this.total.setValue(this.subtotal.value - this.discount.value);
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
      let input_prod = document.getElementById(`input_prod_${productSelected.id}`) as HTMLInputElement;

      this.productSelected.quantity = parseInt(input_prod.value);
      this.productsOrder.push(productSelected);

      const prod = this.fb.group({
        id: [productSelected.id, Validators.required],
        quantity: [input_prod.value, Validators.required],
        price: [productSelected.sale_price, Validators.required]
      });

      const elementProduct = this.productItems;
      elementProduct.push(prod);

      
      //this.calculateTotals();
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
