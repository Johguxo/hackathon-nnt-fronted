import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  URL = 'http://localhost:2005/api/account/'
  idUser:any;

  constructor(
    
    private http: HttpClient
  ) { 
    this.idUser = localStorage.getItem('idUser')
  }

  getBanks(){
    const response = this.http.get(this.URL+'banks')
    return response;
  }

  getBankAccounts() {
    let params = new HttpParams();
    params = params.append('id_user',this.idUser);
    const options = { params: params }
    const response = this.http.get(this.URL+'bank_account', options)
    return response;
  }

  registerBankAccount(body){
    const response = this.http.post(this.URL + 'bank_account/register', body)
    return response;
  }

  //Transactions
  registerTransaction(body){
    const response = this.http.post(this.URL + 'transaction/register', body)
    return response;
  }

  getTransaction(filterBank=null,filterDate=null){
    let params = new HttpParams();
    params = params.append('id_user',this.idUser);
    if (filterBank) {
      params = params.append('bank', filterBank)
    }
    const options = { params: params }
    const response = this.http.get(this.URL+'transactions', options)
    return response;
  }

}
