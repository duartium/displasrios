import { Component, OnInit } from '@angular/core';
import { SellerPersonalReport } from 'src/app/models/reports/sellerPersonalReport.model';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  salesTotal: number = 0;
  personalReport: SellerPersonalReport;

  constructor(private reportService: ReportService) { 

  }

  ngOnInit(): void {
      this.reportService.GetSellerPersonalReport().subscribe(resp => {
          console.log(resp);
          this.personalReport = resp.data;
      }, (err) => {
        console.log('err',err);
      });
  }

}
