import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLogged:boolean = false

  constructor( private _auth:AuthService, private _cookie:CookieService, private _router:Router){}

  ngOnInit(): void {
    this.isLogged= this._auth.getLogged()
  }

  logout(){
    //this._auth.logout().subscribe()
    this._cookie.deleteAll('/')
    this._auth.updateLogin()
    this.isLogged= this._auth.getLogged()
    this._router.navigateByUrl(`/`)
  }
}
