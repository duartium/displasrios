import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-daily-sales',
  templateUrl: './daily-sales.component.html',
  styleUrls: ['./daily-sales.component.css']
})
export class DailySalesComponent implements OnInit, AfterViewInit {

  name = 'Angular   6';
  canvas: any;
  ctx: any;
  myChart: Chart;
  @ViewChild('mychart') mychart;
  data: any = [];
  constructor(){}

  ngOnInit(): void {
    
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



}
