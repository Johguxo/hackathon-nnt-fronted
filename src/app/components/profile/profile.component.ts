import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BankService } from 'src/app/services/bank.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  dataProfile: any;
  dataUser: any;
  listBanks: any;
  bankSelected:any;
  listBankAccounts: any;
  loadingBankAccounts: boolean;
  dataBankAccount: any;
  idUser: any;

  constructor(
    private authService: AuthService,
    private bankService: BankService,
    private modalService: NgbModal
  ) {
    this.dataUser = {
      first_name: '',
      last_name: '',
      email: '',
    }

    this.dataProfile = {
      civil_status: '',
      date_of_birth: '',
      mobile_number: '',
      nacionality: '',
      ruc: '',
      ruc_type: '',
      sector: '',
      arrears: '',
      credit_history: '',
      antiquity: 0,
      number_account: 0,
      net_balance: 0,
      trend: 0,
    }

    this.dataBankAccount = {
      number:'',
      cci: '',
      bank:'',
    }

    this.listBanks = [];
    this.bankSelected = null;
    this.listBankAccounts = [];
    this.loadingBankAccounts = true;

  }

  ngOnInit(): void {
    this.getInfo();
    this.getBankAccounts();
    this.idUser = localStorage.getItem('idUser');
  }

  getInfo() {
    this.authService.getInfoUser().subscribe(
      data => {
        console.log(data)
        this.dataProfile = data['profile']
        this.dataUser = data['user']
      },(err)=>{
        console.log(err)
    })
  }

  updateData(){
    const body = {
      arrears: this.dataProfile.arrears,
      civil_status: this.dataProfile.civil_status,
      credit_history: this.dataProfile.credit_history,
      date_of_birth: this.dataProfile.date_of_birth,
      mobile_number: this.dataProfile.mobile_number,
      nacionality: this.dataProfile.nacionality,
      ruc: this.dataProfile.ruc,
      ruc_type: this.dataProfile.ruc_type,
      sector: this.dataProfile.sector,
    }
    const idProfile = this.dataProfile._id
    this.authService.updateProfile(body,idProfile).subscribe(
      data=>{
        alert("Datos actualizados")
      }
    )
  }

  getBankAccounts() {
    this.loadingBankAccounts = true;
    this.bankService.getBankAccounts().subscribe(
      data => {
        this.listBankAccounts = data;
        this.loadingBankAccounts = false;
      }, (err) => {
        console.log(err)
      }
    )
  }

  createNewBankAccount() {
    if (this.dataBankAccount.number != '' && this.dataBankAccount.cci != '') {
      const body = {
        user: this.idUser,
        number: this.dataBankAccount.number,
        cci: this.dataBankAccount.cci,
        bank: this.bankSelected,
      }
      this.bankService.registerBankAccount(body).subscribe(
        data => {
          this.modalService.dismissAll();
          this.getBankAccounts();
        }
      )
    }
  }

  openModal(content){
    this.getBanks();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  getBanks(){
    this.bankService.getBanks().subscribe(

      data => {

        this.listBanks = data;
        this.bankSelected = this.listBanks[0]['_id']
        console.log(this.listBanks)
      },(err)=> {
        console.log(err)
      }
    )
  }

}
