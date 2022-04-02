import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL = 'http://localhost:2005/api/'
  idUser:any;

  constructor(
    
    private http: HttpClient
  ) { 
    this.idUser = localStorage.getItem('idUser')
  }

  signIn(body) {
    const response = this.http.post(this.URL+'auth/login',body)
    return response
  }

  signUp(body) {
    const response = this.http.post(this.URL+'auth/register',body)
    return response
  }

  getInfoUser(){
    let params = new HttpParams();
    params = params.append('id_user',this.idUser)
    const options = {params: params}
    const response = this.http.get(this.URL +'profile', options)
    return response;
  }

  updateProfile(body,idProfile) {
    const response = this.http.put(this.URL + 'profile/' + idProfile, body)
    return response
  }
}
