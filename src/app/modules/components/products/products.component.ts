import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge, of as observableOf, Subscription,Observable, Subject, startWith, switchMap, map, catchError, } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { FilterShop } from 'src/app/services/models/filter';
import { Product } from 'src/app/services/models/new-product';
import { Category } from 'src/app/services/models/utils';
import { ProductsService } from 'src/app/services/products.service';
import { Constants } from 'src/environments/app.setings';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  
  subs: Subscription;
  refresh = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoadingResults: boolean = true
  resultsLength = 0;
  filter = new FilterShop();
  data: Product[] = [];
  categories: Category[]

  constructor(
    private _product:ProductsService, private router: Router,
    private snackBar: MatSnackBar,
    private _categories: CategoriesService
  ){}

ngOnInit() {

  this._categories.getAll().then(
    res=> this.categories=res
  ).catch(
    err=> this.snackBar.open(Constants.ERROR_COMM)
  )
  this.filter.order=0
  this.filter.orderAsc=false

}


  ngAfterViewInit() {
    this.subs = merge(this.paginator.page ,this.refresh)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          this.filter.from =this.paginator.pageIndex * this.paginator.pageSize,
          this.filter.length=this.paginator.pageSize
          console.log(this.filter)
          return this._product.getAllFiltered(this.filter);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.recordsCount;
          return data.data;
        }),
  
        catchError(() => {
          this.isLoadingResults = false
          this.snackBar.open(Constants.ERROR_COMM);
          return observableOf([]);
        })
    ).subscribe(data => {
        console.log(data)
        this.data = data as Product[]
      });
  
  
    }


    changeFilterOrder($ev:any){
      console.log($ev)
      switch ($ev) {
        case 0:
          this.filter.order=1
          this.filter.orderAsc=true
          break;
        case 1:
          this.filter.order=1
          this.filter.orderAsc=false
          break;
        case 2: 
          this.filter.order=2
          this.filter.orderAsc=true
          break;
        case 3:
          this.filter.order=2
          this.filter.orderAsc=false
          break;
        case 4:
          this.filter.order=0
          this.filter.orderAsc=false
          break;
        case 5:
          this.filter.order=0
          this.filter.orderAsc=true
          break;
      }
      this.refresh.emit()
    }
}
