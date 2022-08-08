import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvidersService } from 'src/app/services/providers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  frmProvider: FormGroup;
  constructor(private fb: FormBuilder,
    private provideService: ProvidersService) { 
    this.createForm();

  }

  ngOnInit(): void {
  }

  createForm(){
    this.frmProvider = this.fb.group({
      ruc: this.fb.control('', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
      name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      address: this.fb.control('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.email]),
      phone: this.fb.control('', [Validators.required, Validators.minLength(10)])
    });
  }

  get ruc(){
    return this.frmProvider.get('ruc');
  }

  get name(){
    return this.frmProvider.get('name');
  }

  get address(){
    return this.frmProvider.get('address');
  }

  get email(){
    return this.frmProvider.get('email');
  }

  get phone(){
    return this.frmProvider.get('phone');
  }

  createProvider(){
    console.log('SUBMIT');
    document.getElementById("loader").style.display = "";

    if(!this.frmProvider.valid){
      this.frmProvider.markAllAsTouched();
      document.getElementById("loader").style.display = "none";
      Swal.fire('Notificación', 'Verifique que sus datos sean válidos e intente nuevamente.', 'warning');
      return;
    }


    this.provideService.create(this.frmProvider.value).subscribe(resp => {
      if(resp.success){
        Swal.fire('Notificación', 'Proveedor creado correctamente.', 'success');
        this.frmProvider.reset();
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
