import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BankService } from 'src/app/services/bank.service';

@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {

  listBankAccounts: any;
  bankAccountSelected: any;
  dataTransaction: any;
  idUser:any;

  constructor(
    private authService: AuthService,
    private bankService: BankService,
  ) {
    this.dataTransaction = {
      amount: 0,
      description: '',
      type: 1,
    }
    this.bankAccountSelected = null;

    this.listBankAccounts = []

  }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('idUser')
    this.getBankAccounts();
  }

  getBankAccounts() {
    this.bankService.getBankAccounts().subscribe(
      data => {
        this.listBankAccounts = data;
        this.bankAccountSelected = data[0]['_id']
      }, (err) => {
        console.log(err)
      }
    )
  }

  createNewTransaction(){
    if(this.dataTransaction.amount != 0 && 
      this.dataTransaction.description != ''){
      const body = {
        amount:this.dataTransaction.amount,
        description:this.dataTransaction.description,
        type:this.dataTransaction.type,
        bank_account:this.bankAccountSelected,
        user:this.idUser,
      }
      this.bankService.registerTransaction(body).subscribe(
        data=>{
          alert("Transaccion creada")
        }
      )
    } else{
      alert("Falta llenar campos")
    }
    
  }

}
