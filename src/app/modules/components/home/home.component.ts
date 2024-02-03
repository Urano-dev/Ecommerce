import { Component, OnInit } from '@angular/core';
import { FilterShop } from 'src/app/services/models/filter';
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

    const filter:FilterShop = {
      from: 0,
      length: 8,
      freeText:'',
      order: 'createdAt',
      categoryId:null,
      brandId:null,
      costMin:null,
      costMax:null,
  }


    this._products.getProducts(filter).subscribe(
      res=>{this.products=res; console.log(res)},
      err=>{console.log(err)}
    )
  }
}
