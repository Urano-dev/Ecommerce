import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products!:any

  constructor(private _products:ProductsService){}

  ngOnInit(){
    this._products.getAll().subscribe(
      res=>{this.products=res; console.log(res)},
      err=>{console.log(err)}
    )
  }
}
