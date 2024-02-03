import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { GrouperService } from 'src/app/services/brand.service';
import { Category } from 'src/app/services/models/utils';
import { Constants } from 'src/environments/app.setings';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  isLogged:boolean = false
  categories:Category[]

  constructor( 
    private _auth:AuthService, 
    private _cookie:CookieService, 
    private _router:Router,
    private _grouper:GrouperService,
    private snackBar: MatSnackBar
    ){}

  
  ngOnInit(): void {
    this.isLogged= this._auth.getLogged()
    
    //get Categories
    this._grouper.getGrouper(2)
    .then((data)=> this.categories=data)
    .catch(()=> this.snackBar.open(Constants.ERROR_COMM))
  }



  logout(){
    //this._auth.logout().subscribe()
    this._cookie.deleteAll('/')
    this._auth.updateLogin()
    this.isLogged= this._auth.getLogged()
    this._router.navigateByUrl(`/`)
  }
}
