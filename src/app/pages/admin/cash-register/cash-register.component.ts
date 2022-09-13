import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemCatalogue } from 'src/app/models/ItemCatalogue.model';
import { CashRegisterService } from 'src/app/services/cash-register.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.css']
})
export class CashRegisterComponent implements OnInit {

  constructor(private cashRegisterService: CashRegisterService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UsersService) { 
      this.frmCaja = this.defaultForm;
      
  }

  collectors: ItemCatalogue[];
  active = 1;
  isOpenendCash: boolean;
  frmCaja: FormGroup;

  ngOnInit(): void {
    this.isOpenedCash();
    this.getCollectorsCatalog();
  }

  get defaultForm(){
    return this.fb.group({
      apertura: this.fb.control('', [Validators.required]),
      cierre: this.fb.control('', [Validators.required]),
      arqueo: this.fb.control('', [Validators.required]),
      collector_id: this.fb.control('', [Validators.required]),
      total_dia: this.fb.control('', [Validators.required])
    });
  }

  get apertura(){
    return this.frmCaja.get('apertura');
  }

  get cierre(){
    return this.frmCaja.get('cierre');
  }

  get collectorId(){
    return this.frmCaja.get('collector_id');
  }

  get totalDia(){
    return this.frmCaja.get('total_dia');
  }

  openCashRegister(){
      this.apertura.markAsTouched();

      if(this.apertura.invalid) return;
      
      this.cashRegisterService.open(parseFloat(this.apertura.value)).subscribe(resp => {
        console.log('cashRegisterService', resp);  
        if(!resp.success){
            Swal.fire("Notificación", "Lo sentimos, no se pudo aperturar caja.", "warning");
          }

          Swal.fire("", "Apertura de caja exitosa", "success")
          .then(() => {
            this.router.navigateByUrl('/admin/punto-venta');
          }); 
          
      }, (err) => {

      });
  }

  closeCashRegister(){
    this.cierre.markAsTouched();

    Swal.fire({
      title: '¿Estás seguro de cerrar caja?',
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.cierre.invalid){
          Swal.fire('Ingrese el valor del total en caja hoy para continuar con el cierre.', '', 'warning');
          return;
        }

        this.cashRegisterService.close(parseFloat(this.cierre.value)).subscribe(resp => {
          console.log('respcierre', resp);
          if(resp.success){
            Swal.fire('Cierre exitoso', '', 'success');
            this.cierre.setValue('');
          }else{
            Swal.fire('Notificación', 'No se pudo realizar el cierre. Ha ocurrido un problema interno.', 'warning')
          }
        });

        
      }
    })


  }

  getCollectorsCatalog(){
    this.userService.getCollectorsCatalog().subscribe(resp => {
      console.log(resp);
      this.collectors = resp.data;
      this.collectorId.setValue(this.collectors[0].id);
    })
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
