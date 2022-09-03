import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { Customer } from 'src/app/models/Customer.model';
import { CustomerFinder } from 'src/app/models/CustomerFinder.model';
import { CustomersService } from 'src/app/services/customers.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { _TableUtils } from 'src/app/common/_TableUtils';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {


  //TABLE
  @ViewChild(DataTableDirective)
  public dtElement: DataTableDirective;
  public dtOptions: any = {};
  public dtTrigger = new Subject();
  public listFooter: any = [];
  
  customers: Customer[];
  constructor(private customerService: CustomersService) { 
    this.getCustomers();
  }

  ngOnInit(): void {
    this.listFooter = this.getColumnsCustomersDT();
	this.initTableCustomers();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getCustomers(){
    this.customerService.getAll().subscribe(resp => {
      console.log(resp.data);
        this.customers = resp.data;
        this.dtOptions.data = this.customers;
        _TableUtils.renderSearchDT(this.dtElement,this.dtTrigger);
        this.dtTrigger.next();
    });
  }

  

	initTableCustomers() {
		this.dtOptions = _TableUtils.getDefaultConfiguration();
    this.dtOptions.columns = this.getColumnsCustomersDT();
    this.dtOptions.columnDefs = this.getColumnsCustomersDefDT();
		this.dtOptions.buttons[9].action = () => {
			this.getCustomers();
		}
	}

  getColumnsCustomersDT() {
		return [
		/*01 */	{ title: 'IDENTIFICACIÓN', data: 'identification', className: 'text-center' },
		/*02 */	{ title: 'NOMBRES', data: 'names', className: 'text-center' },
		/*03 */	{ title: 'EMAIL', data: 'email', className: 'text-center' },
		/*04 */	{ title: 'TELÉFONO', data: 'phone', className: 'text-center' },
		/*05 */	{ title: 'DIRECCIÓN', data: 'address', className: 'text-center' },
		]
	}

	getColumnsCustomersDefDT() {
		return [
			{ // Date columns
				"targets": [0,1,2,3,4],
				"render": function (data, type, row) {
					return _TableUtils.getLabelVacio(data, type);
				}
			}
		]
	}

}
