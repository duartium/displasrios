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
    this.getCustomers();
  }
  
  execEventDatatable(tagEvent){
    if(tagEvent === 'update')
      this.getCustomers();
    console.log(tagEvent);
  }

  getCustomers(){
    this.customerService.getAll().subscribe(resp => {
      console.log(resp.data);
        this.customers = resp.data;
    });
  }

  initTable() {
		this.dtOptions = _TableUtils.getDefaultConfiguration();
    this.dtOptions.columns = this.getColumnsDT();   
    //inicio comentar 
    this.dtOptions.columnDefs = this.getColumnsDefDT();
    this.dtOptions.aditionalButtons = [
      { tag: "edit" },
      { tag: "delete"}
    ];
    //fin comentar 
	}
   //inicio comentar 
  getColumnsDefDT() {
    return [
      { // Date columns
        "targets": [0],
        "orderable": false,
        "searchable": false,
        "render": function (data, type, row) {
          var btns = _TableUtils.getButtonBody('edit','icons fa fa-pencil');
          btns += _TableUtils.getButtonBody('delete','icons fa fa-trash');
          return btns;
        }
      },
      { // Date columns
        "targets": "_all",
        "render": function (data, type, row) {
          return _TableUtils.getLabelVacio(data, type);
        }
      }
    ]
  }
   //fin comentar 
  getColumnsDT() {
		return [
     /*0*/ { title: 'Acción', "orderable": false, footer:false, className: 'text-center', data: '' },
		/*01 */	{ title: 'IDENTIFICACIÓN', data: 'identification',  className: 'text-center' },
		/*02 */	{ title: 'NOMBRES', data: 'names',   className: 'text-center' },
		/*03 */	{ title: 'EMAIL', data: 'email',  className: 'text-center' },
		/*04 */	{ title: 'TELÉFONO', data: 'phone',  className: 'text-center' },
		/*05 */	{ title: 'DIRECCIÓN', data: 'address',  className: 'text-center' },
		]
	}

}
