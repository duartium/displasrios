import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.GetBestCustomers();
  }

  GetBestCustomers(){
    this.reportService.GetBestCustomers().subscribe(resp => {
      console.log(resp);
    });
  }

}
