import { AfterViewInit, Component, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge, of as observableOf, Subscription,Observable, Subject, startWith, switchMap, map, catchError, } from 'rxjs';
import { Filter } from 'src/app/services/models/filter';
import { Product } from 'src/app/services/models/new-product';
import { ProductsService } from 'src/app/services/products.service';
import { Constants } from 'src/environments/app.setings';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements AfterViewInit {
  
  subs: Subscription;
  refresh = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isLoadingResults: boolean = true
  resultsLength = 0;
  filter = new Filter();
  data: Product[] = [];

  constructor(
    private _product:ProductsService, private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngAfterViewInit() {
    this.subs = merge(this.refresh)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;

          return this._product.getAllFiltered(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.filter,
            //this.draw
          );
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

}
