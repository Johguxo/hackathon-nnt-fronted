import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BankService } from 'src/app/services/bank.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataTransactions: any;
  listTransactions: any;
  loadingTransactions: boolean;
  

  constructor(
    private authService: AuthService,
    private bankService: BankService,
  ) {

    this.listTransactions = []
    this.loadingTransactions = true;
    this.dataTransactions = {
      income: 25500,
      expense: 10000,
      budget: 30000
    }
  }

  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public lineChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  
  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.loadingTransactions = true;
    this.bankService.getTransaction().subscribe(
      data => {
        this.listTransactions = data;
        this.loadingTransactions = false;
      },(err)=>{
        console.log(err)
    })
  }

}
