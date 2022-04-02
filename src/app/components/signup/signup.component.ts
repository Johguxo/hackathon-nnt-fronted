import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {

  user = {
    first_name:'',
    last_name:'',
    email:'',
    password:''
  }

  constructor(
    @Inject(DOCUMENT) private _document,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._document.body.classList.add('bodybg-color');
  }

  signUp(){
    this.authService.signUp(this.user).subscribe(
      data=>{
        localStorage.setItem('idUser',data['_id']);
        this.router.navigate(['/home'])
        location.reload();
      }, (err) => {
        alert(err)
      }
    )
  }

}
