import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerDebs, SummaryCustomerDebs } from 'src/app/Dtos/OrderReceivableDto.model';
import { ItemCatalogue } from 'src/app/models/ItemCatalogue.model';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { OrderService } from 'src/app/services/order.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-debt-report',
  templateUrl: './seller-debt-report.component.html',
  styleUrls: ['./seller-debt-report.component.css']
})
export class SellerDebtReportComponent implements OnInit, AfterViewInit {
  collectors: ItemCatalogue[];
  frmSellerDebtReport: FormGroup;
  customerDebts: SummaryCustomerDebs;
  ordersReceivable: CustomerDebs[] = [];
  
  constructor(private userService: UsersService,
    private fb: FormBuilder,
    private catalogService: CatalogsService,
    private orderService: OrderService) { 
    this.frmSellerDebtReport = this.defaultForm;
    this.customerDebts = {totalDebts: 0, lastVisit: '', ordersReceivable: this.ordersReceivable, fullnames: ''};
  }

  ngOnInit(): void {
    this.getCollectorsCatalog();
  }

  get defaultForm(){
    return this.fb.group({
      collector_id: this.fb.control('', [Validators.required]),
    });
  }

  get collectorId(){
    return this.frmSellerDebtReport.get('collector_id');
  }

  getCollectorsCatalog(){
    this.catalogService.getSellersCatalog().subscribe(resp => {
      console.log('collectors',resp);
      this.collectors = resp.data;
      this.collectors.unshift({ id: 0, description: '-- Seleccione el Vendedor --' } as ItemCatalogue);
      this.collectorId.setValue(this.collectors[0].id);
    })
  }

  onSellerChange(){
    this.getCustomerDebts();
  }

  ngAfterViewInit(): void {
    this.customerDebts = {totalDebts: 0, lastVisit: '', ordersReceivable: this.ordersReceivable, fullnames: ''};
  }

  getCustomerDebts() {

      if(this.collectorId.value <= 0){
        Swal.fire('Notificación', 'Seleccione el vendedor para realizar la búsqueda.', 'warning');
        return;
      }

      this.orderService.GetSellerDebts(parseInt(this.collectorId.value)).subscribe(resp => {
        console.log('GetSellerDebts resp',resp);
          if(resp.success){
            this.customerDebts = resp.data;
            console.log('this.customerDebts', this.customerDebts);
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
