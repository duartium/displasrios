import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CustomerDebs, SummaryCustomerDebs } from 'src/app/Dtos/OrderReceivableDto.model';
import { ItemCatalogue } from 'src/app/models/ItemCatalogue.model';
import { CustomersService } from 'src/app/services/customers.service';
import { ReportService } from 'src/app/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-debts',
  templateUrl: './customer-debts.component.html',
  styleUrls: ['./customer-debts.component.css']
})
export class CustomerDebtsComponent implements OnInit, AfterViewInit {

  searchType: ItemCatalogue[] = [
    { id: 1, description: "CÉDULA"},
    { id: 2, description: "NOMBRES"}
  ];
  firstTime: boolean = true;
  names: string = "";
  identification: string = "";
  searchTypeSelected: number = 1;
  customerDebts: SummaryCustomerDebs;
  ordersReceivable: CustomerDebs[] = [];

  constructor(private customerService: CustomersService) { 
    this.customerDebts = {totalDebts: 0, lastVisit: '', ordersReceivable: this.ordersReceivable, fullnames: ''};
  }
  ngAfterViewInit(): void {
    this.customerDebts = {totalDebts: 0, lastVisit: '', ordersReceivable: this.ordersReceivable, fullnames: ''};
    console.log(this.customerDebts);
  }

  ngOnInit(): void {
    
  }

  clear(){
    this.identification = "";
    this.names = "";
  }

  getCustoemrDebts(){
    document.getElementById("loader").style.display = "";
      console.log('identification',this.identification);
      console.log('names',this.names);

      if(this.searchTypeSelected == 1 && this.identification.trim().length < 10){
        document.getElementById("loader").style.display = "none";
        Swal.fire('Notificación', 'Ingrese el número de identificación.', 'warning');
        return;
      }else if(this.searchTypeSelected == 2 && this.names.trim().length == 0){
        document.getElementById("loader").style.display = "none";
        Swal.fire('Notificación', 'Ingrese el nombre del cliente para buscar las deudas.', 'warning');
        return;
      }

      this.customerService.getDebts(this.identification, this.names).subscribe(resp => {
        console.log('resp',resp);
        this.firstTime = false;
          if(resp.success){
            this.customerDebts = resp.data;
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
