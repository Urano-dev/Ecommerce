import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ProductsService } from 'src/app/services/products.service';




@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
  host:{class:'flex-grow-1'}
})
export class ProductsListComponent implements OnInit {
  
  displayedColumns: string[] = ['check', 'id', 'name', 'brand', 'cost', 'stock','createdAt', 'category','edit'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  
  waiting:Boolean=true
  
  products!:Array<any>

  selectedProducts:Array<any> = []

  constructor( private _products:ProductsService){}
  
  ngOnInit(): void {
    this._products.getAll().subscribe(
      res=>{ console.log(res)
        this.waiting=false
      this.products=res.sort((a:any, b:any) => a.id - b.id)
      // TABLA DE MATERIAL
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
    
    },err=>{console.error(err)}
    )
  }


  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  check(row:any){

  }
}
