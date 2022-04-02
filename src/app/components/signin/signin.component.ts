import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SigninComponent implements OnInit {

  user = {
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

  signIn(){
    console.log(this.user)
    this.authService.signIn(this.user).subscribe(
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
