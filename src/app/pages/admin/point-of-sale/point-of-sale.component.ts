import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerFinder } from 'src/app/models/CustomerFinder.model';
import { ProductFinder } from 'src/app/models/ProductFinder.model';
import { ProductSimpleItem } from 'src/app/models/ProductItem.model';
import { CustomersService } from 'src/app/services/customers.service';
import { ProductsService } from 'src/app/services/products.service';
import { SaleService } from 'src/app/services/sale.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FullOrderDto } from 'src/app/Dtos/FullOrderDto.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CashRegisterService } from 'src/app/services/cash-register.service';
import { EmailService } from 'src/app/services/email.service';


@Component({
  selector: 'app-point-of-sale',
  templateUrl: './point-of-sale.component.html',
  styleUrls: ['./point-of-sale.component.css']
})
export class PointOfSaleComponent implements OnInit, AfterViewInit {
  closeResult = '';
  finder = 'customer';
  filterClientFinder = "nombres";
  textClientFinder = "";
  textProductFinder = "";
  modalTitle = 'Buscar cliente';
  customerSelected: CustomerFinder;
  productSelected: ProductFinder;
  customers: CustomerFinder[] = [];
  products: ProductFinder[] = [];
  productsOrder: ProductFinder[] = [];
  detailsOpened: boolean = false;
  arrayItems: ProductSimpleItem[];
  frmOrder: FormGroup;
  catalogs = [];
  quantity_cart: number = 0;
  isOpenendCash: boolean = false;
  
  @ViewChild('content', {read: TemplateRef}) modalMain: TemplateRef<any>;

  constructor(private customerService: CustomersService,
    private fb: FormBuilder,  private productService: ProductsService,
    private saleService: SaleService,
    private modalService: NgbModal,
    private cashRegisterService: CashRegisterService) { 
      this.frmOrder = this.defaultForm;
      
    }
  ngAfterViewInit(): void {
    this.isOpenedCash();
  }

    isOpenedCash(){
      this.cashRegisterService.isOpenedCash().subscribe(resp => {
          this.isOpenendCash = resp.data;
          console.log(resp);
      });
    }

  ngOnInit(): void {
    //this.isOpenedCash();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  get defaultForm(){
    return new FormGroup({
      id_client:  this.fb.control(-1, [Validators.required]),
      items: new FormArray([]),
      customer_payment:  this.fb.control(0, [Validators.required]),
      change: this.fb.control(0, [Validators.required]),
      payment_method:  this.fb.control('1', [Validators.required]),
      payment_mode:  this.fb.control('2', [Validators.required]),
      deadline:  this.fb.control(0, [Validators.required]),
      num_payment_receipt: this.fb.control(''),
      discount:  this.fb.control(0, [Validators.required]),
      subtotal: this.fb.control(0, [Validators.required]),
      iva: this.fb.control(0, [Validators.required]),
      total: this.fb.control(0, [Validators.required]),
      is_payment_advance: this.fb.control("0",[])
    });
  }

  get isPaymentAdvance(){
    return this.frmOrder.get('is_payment_advance');
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

  get deadline(){
    return this.frmOrder.get('deadline');
  }

  get numPaymentReceipt(){
    return this.frmOrder.get('num_payment_receipt');
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


  calculateTotals(){
    this.quantity_cart = 0;
    
    let subtotal: number = 0;
    console.log('this.productItems.value', this.productItems.value);
    if(this.productItems.value.length == 0)
      return

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
      this.modalService.dismissAll();
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
      $("#main-modal").modal("hide");
  }

  clearWhenIsZero(flag: number){
    console.log(this.customerPayment.value);
    if(flag == 1){
      if(this.customerPayment.value == "0")
        this.customerPayment.setValue("");
    }else if(flag == 2){
      if(this.discount.value == "0")
        this.discount.setValue("");
    }else if(flag == 3){
      if(this.deadline.value == "1")
        this.deadline.setValue("");
    }
  }

  setDefaultDiscountValue(){
    if(this.discount.value == "")
      this.discount.setValue(0);
  }

  setDefaultCustomerPaymentValue(){
    if(this.customerPayment.value == "")
      this.customerPayment.setValue(0);
  }

  setDefaultDeadlineValue(){
    if(this.deadline.value == "")
      this.deadline.setValue(1);
  }

  setDefaultNumPaymentReceiptValue(){
    if(this.numPaymentReceipt.value == "")
      this.numPaymentReceipt.setValue(0);
  }

  setInitialDeadlineValue(){
    if(this.PaymentMethod.value == "1019"){//CRÉDITO
      this.deadline.setValue(1);
    }else{
      this.deadline.setValue(0);
      this.isPaymentAdvance.setValue('0');
    }
  }

  addProduct(){
    this.modalTitle = "Buscar Producto";
    this.finder = "product";
    this.modalService.open(this.modalMain);
    //this.toastr.success('Hello world!', 'Toastr fun!');
  }

  showFinder(){
    this.modalTitle = "Buscar Cliente";
    this.finder = "customer";
    this.customers = [];
    this.textClientFinder = "";
    
    
    this.modalService.open(this.modalMain);
  }

  get isDiscountGreatherThanTotal(){
    return this.discount.value > this.total.value;
  }
  
  orderRegister(){
    
    console.log('READY FOR SEND', this.frmOrder);
    
    if(this.idClient.value <= 0){
      Swal.fire({ icon: 'warning', title: 'Notificación', text: 'Seleccione el cliente que realiza el pedido.'});
      return;
    }

    if(this.total.value == 0){
      Swal.fire({ icon: 'warning', title: 'Notificación', text: 'Ingrese al menos 1 producto para continuar.'});
      return;
    }

    if(this.PaymentMode.value == "3"){
      if(this.numPaymentReceipt.value.toString().trim().length == 0){
        Swal.fire({ icon: 'warning', title: 'Notificación', text: 'Ingrese el número de comprobante de la transferencia realizada.'});
        return;
      }
    }

    if(this.PaymentMethod.value == "1" || this.isPaymentAdvance.value == '1'){//CONTADO o REALIZA UN ABONO

      if(this.isDiscountGreatherThanTotal){
        Swal.fire({ icon: 'warning', title: 'Notificación', text: 'El descuento no puede ser mayor al total a pagar.'});
        return;
      }
  
      if(this.customerPayment.value == 0){
        
        if(this.isPaymentAdvance.value == '1'){
          Swal.fire({ icon: 'warning', title: 'Notificación', text: 'Ingrese el monto que el cliente paga como abono. Debe ser mayor a cero.'});
          return;
        }

        Swal.fire({ icon: 'warning', title: 'Notificación', text: 'Ingrese el monto que el cliente paga. Debe ser mayor a cero.'});
        return;
      }
      
      if(this.PaymentMethod.value == "1" ){ //Solo si es al CONTADO
        if(parseFloat(this.customerPayment.value) < parseFloat(this.total.value)){
          Swal.fire({ icon: 'warning', title: 'Notificación', text: 'El monto de pago no puede ser menor que el total a pagar.'});
          return;
        }
      }
      
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
        deadline: parseInt(this.deadline.value),
        num_payment_receipt: this.numPaymentReceipt.value,
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
          this.productItems.clear();
          // this.removeAllItemsProducts();
          // this.frmOrder.get('items').reset();
          this.productsOrder.splice(0);
          console.log(this.productItems);

          const numberFormatted = resp.data.orderNumber.toString().padStart(5, '0');
          Swal.fire({ icon: 'success', title: 'Enviado', text: `Se ha generado el pedido nº ${numberFormatted}`});
        }else{
            Swal.fire({ icon: 'warning', title: 'Pedido Fallido', text: 'Lo sentimos, hubo un problema al registrar tu pedido, vuelve a intentarlo más tarde.'});
        }
    }, (err) => {
        document.getElementById("loader").style.display = "none";
        Swal.fire({ icon: 'error', title: 'Lo sentimos, se ha generado un conflicto', text: 'No se pudo registrar el pedido.'});
    });
  }

}
