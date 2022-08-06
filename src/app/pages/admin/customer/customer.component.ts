import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { ItemCatalogue } from 'src/app/models/ItemCatalogue.model';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, AfterViewInit {
  @ViewChild(LoaderComponent) main_loader;
  frmCustomer: FormGroup;
  
  constructor(private fb: FormBuilder,
    private customerService: CustomersService, 
    private render: Renderer2) { 
    this.createForm();
  }

  ngAfterViewInit() {
    console.log(this.main_loader);   

  }

  ngOnInit(): void {
  }

  createForm(){
    this.frmCustomer = this.fb.group({
      identification: this.fb.control('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      type: this.fb.control('1'),
      ident_type: this.fb.control('C', [Validators.required]),
      names: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      surnames: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      phone: this.fb.control('', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]{10}')]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      address: this.fb.control('', [Validators.required, Validators.minLength(3)]),
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
    return this.frmCustomer.get('phone');
  }

  get email(){
    return this.frmCustomer.get('email');
  }

  get address(){
    return this.frmCustomer.get('address');
  }

  createCustomer(){
    //this.render.setStyle(this.main_loader.nativeElement, 'display','');
    document.getElementById("loader").style.display = "";
    
      if(!this.frmCustomer.valid){
        this.frmCustomer.markAllAsTouched();
        document.getElementById("loader").style.display = "none";
        Swal.fire('Notificación', 'Verifique que sus datos sean válidos e intente nuevamente.', 'warning');
        return;
      }

      this.customerService.create(this.frmCustomer.value).subscribe(resp => {
          if(resp.success){
            Swal.fire('Notificación', 'Cliente creado correctamente.', 'success');
            this.frmCustomer.reset();
          }else{
            Swal.fire('Notificación', resp.message, 'warning');
          }
          document.getElementById("loader").style.display = "none";
      }, (err) => {
        console.log(err);
        Swal.fire('Notificación', err.error, 'error');
        document.getElementById("loader").style.display = "none";
      });
  }
}
