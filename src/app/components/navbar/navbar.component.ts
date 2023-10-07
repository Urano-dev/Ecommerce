import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  isLogged:boolean = false

  constructor( private _auth:AuthService){}

  ngOnInit(): void {
    this.isLogged= this._auth.isLogged
    console.log(this.isLogged)
  }

}
