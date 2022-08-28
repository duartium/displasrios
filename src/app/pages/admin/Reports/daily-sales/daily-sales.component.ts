import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Chart } from 'chart.js';

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
  
  dateIni: NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay() };
  dateFin: NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay() };
  frmFiltersReport: FormGroup;

  constructor(private readonly calendar: NgbCalendar,
    private fb: FormBuilder) {
      this.frmFiltersReport = this.defaultForm;
    }
  ngOnInit(): void {
    console.log('init');
  }

  get defaultForm(){
    return this.fb.group({
      dateFrom: this.fb.control(this.dateIni, [Validators.required]),
      dateUntil: this.fb.control(this.dateFin, [Validators.required]),
    });
  }

  get dateForm(){
    return this.frmFiltersReport.get('dateFrom');
  }

  get dateUntil(){
    return this.frmFiltersReport.get('dateUntil');
  }


  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    this.data = {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };

    this.myChart = new Chart(this.ctx, {
      type: 'pie',
      data: this.data,
     
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
    
  }

  generate(){

  }


}
