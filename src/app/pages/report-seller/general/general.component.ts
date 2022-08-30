import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  salesTotal: number = 0;
  constructor(private reportService: ReportService) { 

  }

  ngOnInit(): void {
      this.reportService.GetTotalSalesToday().subscribe(resp => {
          console.log(resp);
          this.salesTotal = resp.data;
      }, (err) => {
        console.log('err',err);
      });
  }

  getMyReport(){

  }


}
