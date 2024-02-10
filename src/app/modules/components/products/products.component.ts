import { AfterViewInit, Component, EventEmitter, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, of as observableOf, Subscription,Observable, Subject, startWith, switchMap, map, catchError, skip, debounceTime, } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { FilterShop } from 'src/app/services/models/filter';
import { IncomingProduct, Product } from 'src/app/services/models/new-product';
import { Brand, Category } from 'src/app/services/models/utils';
import { ProductsService } from 'src/app/services/products.service';
import { Constants } from 'src/environments/app.setings';
import { MatSliderChange, MatSliderDragEvent } from '@angular/material/slider';
import { GrouperService } from 'src/app/services/product-groupers.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  subs: Subscription;
  refresh = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkDevice();
  }

  modeDrawer:'side'|'over' = 'side'
  fromDrawer: 'left'| 'top' = 'left'

  isLoadingResults: boolean = true
  resultsLength = 0;
  filter = new FilterShop();
  data: IncomingProduct[] = [];
  categories: Category[];
  brands:Brand[]
  selectedOrder = "4"
  category = ''
  @ViewChild(NgForm) filterForm: NgForm;

  constructor(
    private _product:ProductsService, private router: Router,
    private snackBar: MatSnackBar,
    private _router: Router,
    private _actRoute:ActivatedRoute,
    private _utils: UtilsService,
    private _groupers:GrouperService
  ){}

async ngOnInit() {

  this.checkDevice();

  //pide lista de categorías y marcas
  try {
    this.categories = await this._groupers.getGrouper(2)
    this.brands = await this._groupers.getGrouper(1)

    this._actRoute.params.subscribe((param) => {
        this.category = param['category'];
        console.log(this.category)
        if(this.category) {
         const res =  this.categories.find((cat)=> cat.name==this.category)
         this.filter.CategoryId=res.id
         this.filter.order='createdAt'
        this.filter.orderAsc=false
        this.filter.freeText=''
        this.filter.costMin=null
        this.filter.costMax=null
        this.filter.BrandId=null
        }else{
          this.filter.CategoryId=null
          this.filter.order='createdAt'
          this.filter.orderAsc=false
          this.filter.freeText=''
          this.filter.costMin=null
          this.filter.costMax=null
          this.filter.BrandId=null
        }
      }
    );
  } 
  catch{this.snackBar.open(Constants.ERROR_COMM)}
  
    this.subs = merge(this.paginator.page, this.filterForm.valueChanges.pipe(skip(1), debounceTime(500)), this.refresh) //this.paginator.pageSize, 
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.filter.from =this.paginator.pageIndex? this.paginator.pageIndex * this.paginator.pageSize: '0',
          this.filter.length=this.paginator.pageSize
          if(!this.filter.orderAsc) delete this.filter.orderAsc
          return this._product.getProducts(this.filter);

        }),
        map(data => {
          this.isLoadingResults = false;
          this.resultsLength = data.recordsCount;
          return data
        }),
        catchError((err) => {
          console.log(err)
          this.isLoadingResults = false
          this.snackBar.open(Constants.ERROR_COMM);
          return observableOf([]);
        })

    ).subscribe(data => {
        console.log(data)
        this.isLoadingResults=false
        this.data = data as IncomingProduct[]
      });
  

      
    }
    


    changeFilterOrder($ev:any){
      switch ($ev) {
        case '0':
          this.filter.order='cost'
          this.filter.orderAsc=true
          break;
        case '1':
          this.filter.order='cost'
          this.filter.orderAsc=false
          break;
        case '2': 
          this.filter.order='name'
          this.filter.orderAsc=true
          break;
        case '3':
          this.filter.order='name'
          this.filter.orderAsc=false
          break;
        case '4':
          this.filter.order='createdAt'
          this.filter.orderAsc=false
          break;
        case '5':
          this.filter.order='createdAt'
          this.filter.orderAsc=true
          break;
      }
      this.refresh.emit()
    }
   
    changeFilterCategory($event:any){
      this.filter.CategoryId=$event?$event:null
      this.refresh.emit()      
    }
    changeFilterBrand($event:any){
      this.filter.BrandId=$event?$event:null
      this.refresh.emit()      
    }

    clearFilter(){
      this.filter.freeText=''
      this.refresh.emit()
    }

    formatLabel(value: number): string {
      if (value >= 1000) {
        return Math.round(value / 1000) + 'k';
      }
    
      return `${value}`;
    }

    sliderMinChanged(event: any) {
      this.filter.costMin =  event.target.value;
      this.refresh.emit()
    }
    sliderMaxChanged(event: any) {
      this.filter.costMax =  event.target.value;
      this.refresh.emit()
    }
    

    //ROUTERS
    goToDetail(id:number){
      this._router.navigate([`/details/${id}`])
    }

    checkDevice(): void {
      const width = window.innerWidth;
      //si no es desktop
      if(width <=992) {
        this.fromDrawer = 'top'
      }else {
        //si es desktop
        this.fromDrawer = 'left'
      }
    }
}
