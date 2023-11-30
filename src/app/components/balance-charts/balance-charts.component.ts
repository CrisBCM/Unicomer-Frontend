import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-balance-charts',
  templateUrl: './balance-charts.component.html',
  styleUrls: ['./balance-charts.component.css']
})
export class BalanceChartsComponent implements OnInit{

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions:any;

  constructor(){}

  ngOnInit(): void {
    this.barChart();
  }
  barChart(){
    this.chartOptions = {
      chart:{
        type: 'column'
      },
      title: '',
      legend: {
        enabled: false
      },
      credits: {
        enabled:false
      },
      xAxis:{
        categories:[
          'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'
        ],
        
      },
      yAxis:{
        title: ''
      },

      series: this.chartData
    }
  }

  chartData =  [
    {
      name : 'Ingreso',
      data : [20000, 5000, 6000, 1000, 50, 25000, 10000]
    },
    {
      name : 'Egreso',
      data : [1000, 2000, 7000, 500, 200, 14000, 5000]
    }
  ]
}
