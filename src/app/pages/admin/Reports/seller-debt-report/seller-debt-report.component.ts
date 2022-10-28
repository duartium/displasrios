import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemCatalogue } from 'src/app/models/ItemCatalogue.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-seller-debt-report',
  templateUrl: './seller-debt-report.component.html',
  styleUrls: ['./seller-debt-report.component.css']
})
export class SellerDebtReportComponent implements OnInit {
  collectors: ItemCatalogue[];
  frmSellerDebtReport: FormGroup;

  
  constructor(private userService: UsersService,
    private fb: FormBuilder) { 
    this.frmSellerDebtReport = this.defaultForm;
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
    this.userService.getCollectorsCatalog().subscribe(resp => {
      console.log('collectors',resp);
      this.collectors = resp.data;
      this.collectors.unshift({ id: 0, description: '-- Seleccione el Vendedor --' } as ItemCatalogue);
      this.collectorId.setValue(this.collectors[0].id);
    })
  }


}
