import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  url=environment._urlApi
  isLogged:boolean


  constructor(private http:HttpClient) { 
    this.isLogged=false
  }

  public setIsLogged(bool:boolean){
    console.log(bool)
    this.isLogged = bool
    console.log(this.isLogged)
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


}
