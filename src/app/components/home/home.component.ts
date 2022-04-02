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
  loadingChartLine: boolean;
  loadingChartDoughut: boolean;

  constructor(
    private authService: AuthService,
    private bankService: BankService,
  ) {

    this.listTransactions = []
    this.loadingTransactions = true;
    this.loadingChartLine = true;
    this.loadingChartDoughut = true;
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
  
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public lineChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  public doughnutChartLabels = ['Ingreso', 'Gastos'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';

  ngOnInit(): void {
    this.getTransactions();
  }

  generateData(listData){
    let list_income = [];
    let list_expense = [];
    let list_labels = [];
    let index = 0;
    let amount1 = 0;
    let amount2 = 0;

    for(let data of listData) {
      //list_labels.push(new Date(data.createdAt))
      list_labels.push(index)
      index +=1

      if (data.type == 1){
        amount1 += (data.amount as number)
        list_income.push(data.amount)
     } else {
        amount2 += (data.amount as number)
        list_expense.push(data.amount)
     }
    }
    this.lineChartData = [{ data: list_income, label: 'Ingresos'},
                        { data: list_expense, label: 'Gastos'}];
    this.lineChartLabels = list_labels;
    this.loadingChartLine = false;
    this.dataTransactions.income = amount1;
    this.dataTransactions.income = amount2;
    this.doughnutChartData = [amount1, amount2];
    this.loadingChartDoughut = false;
  }

  getTransactions() {
    this.loadingTransactions = true;
    this.bankService.getTransaction().subscribe(
      data => {
        this.listTransactions = data;
        this.generateData(this.listTransactions)
        this.loadingTransactions = false;
      },(err)=>{
        console.log(err)
    })
  }

}
