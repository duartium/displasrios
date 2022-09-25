import { Component, OnInit } from '@angular/core';
import { BestCustomer } from 'src/app/models/Customer.model';
import { MostSelledProductDto } from 'src/app/models/Products.model';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  bestCustomers: BestCustomer[];
  mostSelledProducts: MostSelledProductDto[];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.GetBestCustomers();
    this.GetMostSelledProducts();
  }

  GetBestCustomers(){
    this.reportService.GetBestCustomers().subscribe(resp => {
      
      this.bestCustomers = resp.data;
      console.log('this.bestCustomers', this.bestCustomers);
    });
  }

  GetMostSelledProducts(){
    this.reportService.GetTop10MostSelledProducts().subscribe(resp => {
      this.mostSelledProducts = resp.data;
    });
  }

}
