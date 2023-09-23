import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit  {
  data!:any

  constructor(
    private _data:ProductsService,
    private route: ActivatedRoute,
    private router: Router
    ){}
  
  ngOnInit(){
    this.route.params.subscribe(
      res=>{
        this.getProduct(res['id'])  
        
      },
      err=>{}
    )
  }

  getProduct(id:any){ 
    this._data.getOne(id).subscribe(
      res=>{this.data=res
        console.log(this.data) 
      }
    )
  }
  addToCart(id:any){}
}
