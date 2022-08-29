import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'chart.js';
import { COLORS_CHART } from 'src/app/constants/colors';
import { IncomeBySellerDto } from 'src/app/Dtos/IncomeBySellerDto.model';
import { DateUse } from 'src/app/enums/common.enum';
import { ColorsChart } from 'src/app/interfaces/colors';
import { IncomeBySellersRequest } from 'src/app/models/IncomeBySellers.model';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-daily-sales',
  templateUrl: './daily-sales.component.html',
  styleUrls: ['./daily-sales.component.css']
})
export class DailySalesComponent implements OnInit, AfterViewInit {

  canvas: any;
  ctx: any;
  myChart: Chart;
  @ViewChild('mychart') mychart;
  data: any = [];
  
  currentDate: Date = new Date();
  dateIni: NgbDateStruct = { year: this.currentDate.getUTCFullYear(), month: this.currentDate.getMonth()+1, day: this.currentDate.getDate() };
  dateFin: NgbDateStruct = { year: this.currentDate.getUTCFullYear(), month: this.currentDate.getMonth()+1, day: this.currentDate.getDate() };
  salesBySeller: IncomeBySellerDto[];
  usernames: string[];
  valuesBySeller: number[];
  totalSale: number;

  constructor(private readonly calendar: NgbCalendar,
    private reportService: ReportService) {
      
    }

  ngOnInit(): void {
    console.log('init');
  }

  NgbDateStructToString(flag: DateUse){
    if(flag == DateUse.DATE_FROM){
        return `${this.dateIni.year}-${this.dateIni.month}-${this.dateIni.day}`;
    }else{
      return `${this.dateFin.year }-${this.dateFin.month}-${this.dateFin.day}`;
    }
  }
  
  ngAfterViewInit() {
    this.getReportBySellers();

    
  }

  getColorChart(){
    let colors = COLORS_CHART.slice(0, this.valuesBySeller.length);
    console.log(colors);
    return colors;
  }

  setInfoChart(){
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    this.data = {
      labels: this.usernames,
      datasets: [{
        label: 'Ventas del día',
        data: this.valuesBySeller,
        backgroundColor: this.getColorChart(),
        hoverOffset: 4
      }]
    };
    console.log('this.data', this.data);

    this.myChart = new Chart(this.ctx, {
      type: 'bar',
      data: this.data,
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
    });
  }

  refresh(){
    //chart.data.labels.push(label);
    this.myChart.data.datasets[0].data = [];
    this.myChart.data.datasets[0].data = [100, 400, 100];
    console.log(this.myChart.data.datasets);
    this.myChart.update();
  }

  getReportBySellers(){

    const request: IncomeBySellersRequest = {
      dateFrom: this.NgbDateStructToString(DateUse.DATE_FROM),
      dateUntil: this.NgbDateStructToString(DateUse.DATE_UNTIL),
    };

    this.reportService.IncomePerSellers(request).subscribe(resp => {
      console.log('resp',resp);
        if(resp.success){
          this.salesBySeller = resp.data;
          this.usernames = this.salesBySeller.map(x => x.user);
          this.valuesBySeller = this.salesBySeller.map(x => parseFloat(x.total));
          console.log(this.valuesBySeller);
          this.setInfoChart();
          this.totalSale = this.valuesBySeller.reduce((a, b) => a + b);
        }else{

        }
    }, (err) => {
      console.log('err',err);
    });
  }

  generate(){
    this.getReportBySellers();
  }


}
