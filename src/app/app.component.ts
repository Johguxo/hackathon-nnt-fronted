import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fronted';
  userLogged: boolean;
  constructor (
    private router: Router,
  ) {
    this.userLogged = false;
  }

  ngOnInit(): void {
    if (localStorage.getItem('idUser')) {
      this.userLogged = true;
      this.router.navigate(['/home'])
    }
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/signUp'])
  }
}
