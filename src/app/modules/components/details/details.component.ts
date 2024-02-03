import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Constants } from 'src/environments/app.setings';

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
    private snackBar:MatSnackBar,
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
    this._data.getOne(id)
    .then(res=>{this.data=res})
    .catch(()=>this.snackBar.open(Constants.ERROR_COMM))
  }
  addToCart(id:any){}
}
