import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SummaryOrderOfDay } from 'src/app/Dtos/OrderReceivableDto.model';
import { CustomerFinder } from 'src/app/models/CustomerFinder.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  textClientFinder = "";
  customerSelected: CustomerFinder;
  summaryOrders: SummaryOrderOfDay[];
  constructor(private orderService: OrderService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCollectionOfDay();
  }

  selectedClient(customerSelected: CustomerFinder){
    this.customerSelected = customerSelected;
    this.modalService.dismissAll();
  }


  getCollectionOfDay(){
    this.orderService.GetCollectionOfDay().subscribe(resp => {
        if(resp.success){
            this.summaryOrders = resp.data;
        }
    });
  }


}
