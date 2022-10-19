import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerFinder } from 'src/app/models/CustomerFinder.model';
import { CustomersService } from 'src/app/services/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {
  closeResult = '';
  modalTitle = "Buscar Cliente";
  filterClientFinder = "nombres";
  textClientFinder = "";
  @ViewChild('content', {read: TemplateRef}) modalMain: TemplateRef<any>;
  customerSelected: CustomerFinder;
  customers: CustomerFinder[] = [];
  frmFilters: FormGroup;
  
  constructor(private modalService: NgbModal,
    private fb: FormBuilder,
    private customerService: CustomersService) { 
      this.frmFilters = this.defaultForm;
    }

  ngOnInit(): void {
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  showFinder(){
    this.customers = [];
    this.modalService.open(this.modalMain);
    this.textClientFinder = "";
  }

  findOrders(){

  }

  findCustomerModal(){
    
  }

  findCustomer(){
    document.getElementById("loader").style.display = "";
    

    if(this.filterClientFinder === "identification"){
      this.customerService.getByIdentification(this.textClientFinder)
      .subscribe(resp => {
        document.getElementById("loader").style.display = "none";
        this.customers.push(resp.data);

      }, (errorResp) => {
        document.getElementById("loader").style.display = "none";
        this.customers = [];
        if(errorResp.status == 404){
            
        }
      });

    }else{
      
      this.customerService.getByNames(this.textClientFinder)
      .subscribe(resp => {
        document.getElementById("loader").style.display = "none";
        console.log(resp);
        this.customers = resp.data;
      }, (errorResp) => {
          console.log(errorResp);
          document.getElementById("loader").style.display = "none";
        if(errorResp.status > 499){
          Swal.fire("Inconveniente de Infraestructura", "Lo sentimos, por ahora el servicio no se encuentra disponible.", "error");
        }
      });
    }
}

  get defaultForm(){
    return new FormGroup({
      id_client:  this.fb.control(-1, [Validators.required]),
    });
  }

  
  get idClient(){
    return this.frmFilters.get('id_client');
  }


  selectedClient(customerSelected: CustomerFinder){
    this.customerSelected = customerSelected;
    this.idClient.setValue(customerSelected.id);
    this.modalService.dismissAll();
}

}
