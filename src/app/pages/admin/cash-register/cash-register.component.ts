import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CashRegisterService } from 'src/app/services/cash-register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.css']
})
export class CashRegisterComponent implements OnInit {

  constructor(private cashRegisterService: CashRegisterService,
    private fb: FormBuilder,
    private router: Router) { 
      this.frmCaja = this.defaultForm;
  }
  active = 1;
  isOpenendCash: boolean;
  frmCaja: FormGroup;

  ngOnInit(): void {
    this.isOpenedCash();
  }

  get defaultForm(){
    return this.fb.group({
      apertura: this.fb.control('', [Validators.required]),
      cierre: this.fb.control('', [Validators.required]),
      arqueo: this.fb.control('', [Validators.required])
    });
  }

  get apertura(){
    return this.frmCaja.get('apertura');
  }

  openCashRegister(){
      this.apertura.markAsTouched();

      if(this.apertura.invalid) return;
      
      this.cashRegisterService.open(parseFloat(this.apertura.value)).subscribe(resp => {
        console.log('cashRegisterService', resp);  
        if(!resp.success){
            Swal.fire("Notificación", "Lo sentimos, no se pudo aperturar caja.", "warning");
          }

          Swal.fire({
            title: 'Apertura de caja exitosa',
            text: '¿Desea ir a punto de venta?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Sí',
            denyButtonText: 'No',
            customClass: {
              actions: 'my-actions',
              cancelButton: 'order-1 right-gap',
              confirmButton: 'order-2',
              denyButton: 'order-3',
            }
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigateByUrl('/admin/punto-venta');
            }
          }); 
          
      }, (err) => {

      });
  }

  isOpenedCash(){
    this.cashRegisterService.isOpenedCash().subscribe(resp => {
        this.isOpenendCash = resp.data;
        if(resp.data){
          this.active = 2;
        }
    });
  }

}
