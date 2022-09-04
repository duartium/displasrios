import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { _TableUtils } from 'src/app/common/_TableUtils';

@Component({
  selector: 'app-datatable-custom',
  templateUrl: './datatable-custom.component.html',
  styleUrls: ['./datatable-custom.component.css']
})
export class DatatableCustomComponent implements OnInit {

  @ViewChild(DataTableDirective)
  public dtElement: DataTableDirective;
  public dtTrigger = new Subject();
  @Input()  dtOptions: any = [];

  @Output() updateDataTable = new EventEmitter<any>();

  constructor() {
  }

  @Input() set setDataTable(value: any) {
    this.dtOptions.data = value;    
    _TableUtils.renderSearchDT(this.dtElement,this.dtTrigger);
    this.dtTrigger?.next();
  }
  
 @Input() set setOptions(value: any) {
  this.dtOptions = value;    
  this.dtOptions.buttons[9].action = () => {
    this.updateDataTable.emit(null);
  }
}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dtTrigger?.next();
  
  }

  ngOnDestroy(): void {
    this.dtTrigger?.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    _TableUtils.resize(this.dtElement);
    
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    _TableUtils.resize(this.dtElement);
  }

}
