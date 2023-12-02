import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  url=environment._urlApi
  isLogged:boolean


  constructor(private http:HttpClient, private _cookie:CookieService) {
    this.isLogged=  this._cookie.check('token')
  }

public updateLogin(){
  this.isLogged=  this._cookie.check('token')
  return this.isLogged
}

  
  public getLogged() {
    return this.isLogged
  }

  public login(loginFormUser:any):Observable<any>{
    const user = {
      email: loginFormUser.email_address,
      password: loginFormUser.password
    }
    return this.http.post<any>(this.url + 'users/login', user)
  }

  public logout():Observable<any>{
    this._cookie.deleteAll('/')
    this.updateLogin()
    return this.http.get<any>(this.url + 'users/logout')
  }

  public signup(newUser:User):Observable<any>{
    return this.http.post<any>(this.url + 'users/signup', newUser)
  }
  
}
