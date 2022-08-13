import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { CustomerFinder } from 'src/app/models/CustomerFinder.model';
import { ProductFinder } from 'src/app/models/ProductFinder.model';
import { CustomersService } from 'src/app/services/customers.service';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { FullOrderDto } from 'src/app/Dtos/FullOrderDto.model';
import Swal from 'sweetalert2';
import { SaleService } from 'src/app/services/sale.service';
import { data } from 'jquery';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  finder = 'customer';
  filterClientFinder = "nombres";
  textClientFinder = "asda";
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
    private toastr: ToastrService,
    private saleService: SaleService) { 
      this.frmOrder = this.defaultForm;
    }

   

  ngOnInit(): void {
     
  }

  get defaultForm(){
    return new FormGroup({
      id_client:  this.fb.control(-1, [Validators.required]),
      items: this.fb.array([]),
      customer_payment:  this.fb.control(0, [Validators.required, Validators.minLength(1)]),
      change: this.fb.control(0, [Validators.required]),
      payment_method:  this.fb.control('1', [Validators.required]),
      payment_mode:  this.fb.control('2', [Validators.required]),
      discount:  this.fb.control(0, [Validators.required]),
      subtotal: this.fb.control(0, [Validators.required]),
      iva: this.fb.control(0, [Validators.required]),
      total: this.fb.control(0, [Validators.required])
    });
  }

  get idClient(){
    return this.frmOrder.get('id_client');
  }

  get customerPayment(){
    return this.frmOrder.get('customer_payment');
  }

  get PaymentMethod(){
    return this.frmOrder.get('payment_method');
  }

  get PaymentMode(){
    return this.frmOrder.get('payment_mode');
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

  get iva(){
    return this.frmOrder.get('iva');
  }

  get total(){
    return this.frmOrder.get('total');
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

 removeAllItemsProducts(){
  this.productItems.reset();
 }

 removeProduct(id: number){
    console.log('ELIMINAR', id);
 }


  calculateTotals(){
    this.quantity_cart = 0;
    
    let subtotal: number = 0;
    this.productItems.value.forEach(prod => {
        this.quantity_cart += parseInt(prod.quantity);
        let total_line = parseFloat(prod.price) * parseInt(prod.quantity);
        subtotal += total_line;
    });
    this.subtotal.setValue(subtotal);
    this.total.setValue(this.subtotal.value);
    this.iva.setValue(subtotal * 0.12);
  }

  setOrderChange(){
      if(this.customerPayment.value.length == 0){
          this.change.setValue(0);
      }
        
      let currentValue: number = parseFloat(this.customerPayment.value);
      if(currentValue > parseFloat(this.total.value)){
        this.change.setValue(currentValue - parseFloat(this.total.value));
      }else{
        this.change.setValue(0);
      }
  }

  applyDiscount(){
    //if(this.fullOrderDto.discount === 0) return;
    console.log('APPLYDISCOUNT', this.discount);
    this.total.setValue(this.subtotal.value - this.discount.value);
    this.iva.setValue(this.total.value * 0.12);
  }

  changeFilterCustomer(){
      // this.textClientFinder = "";
      // this.customers = [];
  }

  showOrderDetails(){
      this.detailsOpened = !this.detailsOpened;
  }

  findCustomer(){
      console.log(this.filterClientFinder);
      console.log(this.textClientFinder);
      document.getElementById("loader").style.display = "";
      

      if(this.filterClientFinder === "identification"){
        this.customerService.getByIdentification(this.textClientFinder)
        .subscribe(resp => {
          document.getElementById("loader").style.display = "none";
          this.customers.push(resp.data);

        }, (errorResp) => {
          document.getElementById("loader").style.display = "none";
          this.customers = [];
          if(errorResp.status == 404){
              
          }
        });

      }else{
        
        this.customerService.getByNames(this.textClientFinder)
        .subscribe(resp => {
          document.getElementById("loader").style.display = "none";
          console.log(resp);
          this.customers = resp.data;
        }, (errorResp) => {
            console.log(errorResp);
            document.getElementById("loader").style.display = "none";
          if(errorResp.status > 499){
            Swal.fire("Inconveniente de Infraestructura", "Lo sentimos, por ahora el servicio no se encuentra disponible.", "error");
          }
        });
      }
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

  selectedClient(customerSelected: CustomerFinder){
      this.detailsOpened = true;
      this.customerSelected = customerSelected;
      this.idClient.setValue(customerSelected.id);
      $("#main-modal").modal("hide");
  }

  selectedProduct(productSelected: ProductFinder){
      this.productSelected = productSelected;
      let input_prod = document.getElementById(`input_prod_${productSelected.id}`) as HTMLInputElement;

      this.productSelected.quantity = parseInt(input_prod.value);
      this.productsOrder.push(productSelected);

      const prod = this.fb.group({
        id: [productSelected.id, Validators.required],
        quantity: [parseInt(input_prod.value), Validators.required],
        price: [parseFloat(productSelected.sale_price.toString()), Validators.required]
      });

      const elementProduct = this.productItems;

      elementProduct.push(prod);

      
      this.calculateTotals();
      $("#main-modal").modal("hide");
  }

  clearWhenIsZero(flag: number){
    console.log(this.customerPayment.value);
    if(flag == 1){
      if(this.customerPayment.value == "0"){
        this.customerPayment.setValue("");
      }
    }else{
      if(this.discount.value == "0"){
        this.discount.setValue("");
     }
    }
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
    this.customers = [];
    this.textClientFinder = "";
    
    $("#main-modal").modal("show");
  }

  
  orderRegister(){
    
    console.log('READY FOR SEND', this.frmOrder.value);
    
    if(this.idClient.value <= 0){
      Swal.fire({ icon: 'warning', title: 'Notificación', text: 'Seleccione el cliente que realiza el pedido.'});
      return;
    }

    if(this.total.value == 0){
      Swal.fire({ icon: 'warning', title: 'Notificación', text: 'Ingrese al menos 1 producto para continuar.'});
      return;
    }

    if(this.customerPayment.value == 0){
      Swal.fire({ icon: 'warning', title: 'Notificación', text: 'Ingrese el monto que el cliente paga.'});
      return;
    }

    if(parseFloat(this.customerPayment.value) < parseFloat(this.total.value)){
      Swal.fire({ icon: 'warning', title: 'Notificación', text: 'El monto de pago no puede ser menor que el total a pagar.'});
      return;
    }

    if(!this.frmOrder.valid){
      this.frmOrder.markAllAsTouched();
      Swal.fire({ icon: 'warning', title: 'Notificación', text: 'Complete los datos del pedido para enviarlo'});
      return;
    }
    document.getElementById("loader").style.display = "";
    
    const order: FullOrderDto = {
        id_client: this.idClient.value,
        customer_payment: parseFloat(this.customerPayment.value),
        change: parseFloat(this.change.value),
        items: this.productItems.value,
        payment_method: parseInt(this.PaymentMethod.value),
        payment_mode: parseInt(this.PaymentMode.value),
        discount: parseFloat(this.discount.value),
        subtotal: this.subtotal.value,
        iva: this.iva.value,
        total: this.total.value
    };
    //Object.assign(order, this.frmOrder.value);
    console.log('ORDER OBJ', order);
    
    

    this.saleService.create(order).subscribe(resp => {
        console.log('RESPUESTA ORDER', resp);
        document.getElementById("loader").style.display = "none";
        if(resp.success){
          this.frmOrder.reset(this.defaultForm.value);
          this.quantity_cart = 0;
          this.customerSelected = null;
          this.removeAllItemsProducts();
          this.frmOrder.get('items').reset();
          this.productsOrder.splice(0);
          console.log(this.productItems);

          Swal.fire({ icon: 'success', title: 'Enviado', text: `Se ha generado el pedido nº ${resp.data}`});
        }else{
            Swal.fire({ icon: 'warning', title: 'Pedido Fallido', text: 'Lo sentimos, hubo un problema al registrar tu pedido, vuelve a intentarlo más tarde.'});
        }
    }, (err) => {
        document.getElementById("loader").style.display = "none";
        Swal.fire({ icon: 'error', title: 'Lo sentimos, se ha generado un conflicto', text: 'No se pudo registrar el pedido.'});
    });
  }

}
