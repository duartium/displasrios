import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TotalsCashClose } from 'src/app/Dtos/TotalsCashCloseDto.model';
import { ItemCatalogue } from 'src/app/models/ItemCatalogue.model';
import { SalesSellerToday } from 'src/app/models/SalesSellerToday.model';
import { CashRegisterService } from 'src/app/services/cash-register.service';
import { SaleService } from 'src/app/services/sale.service';
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
    private userService: UsersService,
    private saleService: SaleService) { 
      this.frmCaja = this.defaultForm;

  }

  collectors: ItemCatalogue[];
  active = 1;
  isOpenendCash: boolean;
  frmCaja: FormGroup;
  recaudacionCompleta: boolean = false;
  totalsForCashClose: TotalsCashClose;

  ngOnInit(): void {
    this.isOpenedCash();
    this.getCollectorsCatalog();
    this.getTotalsForCashClose();
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
      
      document.getElementById("loader").style.display = "";
      this.cashRegisterService.open(parseFloat(this.apertura.value)).subscribe(resp => {
        console.log('cashRegisterService', resp);  
        if(!resp.success){
            Swal.fire("Notificación", "Lo sentimos, no se pudo aperturar caja.", "warning");
          }

          Swal.fire("", "Apertura de caja exitosa", "success")
          .then(() => {
            this.router.navigateByUrl('/admin/punto-venta');
          }); 
          document.getElementById("loader").style.display = "none";
      }, (err) => {
          document.getElementById("loader").style.display = "none";
          console.log('errOpenCashRegister', err);
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
        
        document.getElementById("loader").style.display = "";
        this.cashRegisterService.close(parseFloat(this.cierre.value)).subscribe(resp => {
          console.log('respcierre', resp);
          if(resp.success){
            Swal.fire('Cierre exitoso', '', 'success');
            this.cierre.setValue('');
          }else{
            Swal.fire('Notificación', 'No se pudo realizar el cierre. Ha ocurrido un problema interno.', 'warning')
          }
          document.getElementById("loader").style.display = "none";
        }, (err) => {
          document.getElementById("loader").style.display = "none";
          console.log(err);
          Swal.fire('Notificación', '', 'error');
        });

      }
    })
  }

  getTotalsForCashClose(){
    this.cashRegisterService.getTotalsForCashClose().subscribe(resp => {
        this.totalsForCashClose = resp.data;
    });
  }

  saveCollectorSalesToday(){
    console.log(this.frmCaja);
    if(this.collectorId.invalid){
      Swal.fire("Seleccione el vendedor", "", "warning");
      return;
    }

    if(this.totalDia.invalid){
      this.totalDia.markAsTouched();
      Swal.fire("Ingrese el valor de los ingresos de hoy del vendedor", "", "warning");
      return;
    }

    document.getElementById("loader").style.display = "";
    let salesToday: SalesSellerToday = {
        idUser: parseInt(this.collectorId.value),
        amount: parseFloat(this.totalDia.value)
    } 

    this.saleService.saveCollectorSalesToday(salesToday).subscribe(resp => {
        console.log(resp);
        if(resp.success){
          this.totalDia.setValue('');
          this.totalDia.markAsUntouched();
          this.getCollectorsCatalog();
          Swal.fire("Los ingresos del día del vendedor fueron registrados", "", "success");
        }else{
          Swal.fire("No se pudo registrar los ingresos del vendedor", "", "warning");
        }
        document.getElementById("loader").style.display = "none";
    }, (err) => {
      document.getElementById("loader").style.display = "none";
      Swal.fire("No se pudo registrar los ingresos del vendedor", "", "error");
    });
  }

  getCollectorsCatalog(){
    this.userService.getCollectorsCatalog().subscribe(resp => {
      console.log('collectors',resp);
      this.collectors = resp.data;

      if(resp.data.length <= 0){
        this.recaudacionCompleta = true; 
        return;
      }else{
        this.recaudacionCompleta = false;
      }

      this.collectorId.setValue(this.collectors[0].id);
    })
  }

  isOpenedCash(){
    this.cashRegisterService.isOpenedCash().subscribe(resp => {
        this.isOpenendCash = resp.data;
        console.log('this.isOpenendCash', this.isOpenendCash);
        if(resp.data){
          this.active = 2;
        }
    });
  }

}
