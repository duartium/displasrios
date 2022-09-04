import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/Customer.model';
import { CustomersService } from 'src/app/services/customers.service';
import { DataTableDirective } from 'angular-datatables';
import { _TableUtils } from 'src/app/common/_TableUtils';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  public dtOptions: any = {};
  customers: Customer[];
  constructor(private customerService: CustomersService) { 
   
  }

  ngOnInit(): void {
    this.initTable();
    this.getCustomers(null);
  }
  
  getCustomers(parameter){
    this.customerService.getAll().subscribe(resp => {
      console.log(resp.data);
        this.customers = resp.data;
    });
  }

  initTable() {
		this.dtOptions = _TableUtils.getDefaultConfiguration();
    this.dtOptions.columns = this.getColumnsDT();    
	}
  
  getColumnsDT() {
		return [
		/*01 */	{ title: 'IDENTIFICACIÓN', data: 'identification', className: 'text-center' },
		/*02 */	{ title: 'NOMBRES', data: 'names', className: 'text-center' },
		/*03 */	{ title: 'EMAIL', data: 'email', className: 'text-center' },
		/*04 */	{ title: 'TELÉFONO', data: 'phone', className: 'text-center' },
		/*05 */	{ title: 'DIRECCIÓN', data: 'address', className: 'text-center' },
		]
	}

}
