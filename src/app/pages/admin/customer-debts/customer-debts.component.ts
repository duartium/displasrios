import { Component, OnInit } from '@angular/core';
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
export class CustomerDebtsComponent implements OnInit {

  searchType: ItemCatalogue[] = [
    { id: 1, description: "CÉDULA"},
    { id: 2, description: "NOMBRES"}
  ];
  names: string = "";
  identification: string = "";
  searchTypeSelected: number = 1;
  customerDebts: SummaryCustomerDebs;
  ordersReceivable: CustomerDebs[];

  constructor(private customerService: CustomersService) { 
    this.customerDebts = {totalDebts: 0, lastVisit: '', ordersReceivable: this.ordersReceivable, fullnames: ''};
  }

  ngOnInit(): void {
  }

  getCustoemrDebts(){
    document.getElementById("loader").style.display = "";
    
      if(this.searchTypeSelected == 1 && this.identification.trim().length == 0){
        document.getElementById("loader").style.display = "none";
        Swal.fire('Notificación', 'Ingrese el número de identificación.', 'warning');
        return;
      }else if(this.searchTypeSelected == 2 && this.names.trim().length == 0){
        document.getElementById("loader").style.display = "none";
        Swal.fire('Notificación', 'Ingrese el nombre del cliente para buscar las deudas.', 'warning');
        return;
      }

      this.customerService.getDebts(this.identification).subscribe(resp => {
        console.log('resp',resp);
          if(resp.success){
            this.customerDebts = resp.data;
            this.identification = "";
            this.names = "";
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
