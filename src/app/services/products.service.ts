import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './models/new-product';
import { Filter, FilterShop } from './models/filter';

@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  URL_API=environment._urlApi


  constructor(private http:HttpClient) { }


  public getAll():Observable<Product[]>{
    return this.http.get<any>(this.URL_API + 'products')
  }

  public getAllLimit(number:number):Observable<any[]>{
    return this.http.get<any>(this.URL_API + 'products'+`?quantity=${number}`)
  }
  
  public getAllByCategory(categoryId:string):Observable<any[]>{
    return this.http.get<any>(this.URL_API + 'products'+`?categoryId=${categoryId}`)
  }


  public getLatest(){
    return this.http.get<any>(this.URL_API + 'products') // FALTA RUTA ------------------------------------------
  }

// Trae un producto
  public getOne(id:any){
    return this.http.get<any>(this.URL_API + 'products/'+id)
  }
  
  //crea un producto nuevo
  public create(product:Product ){
    return this.http.post<any>(this.URL_API + 'products', product)
  }
  
  //Actualiza un producto, requiere id de producto y un objeto con los contenidos
  public updateOne(productUpd:Product, id:string){
    return this.http.patch<any>(this.URL_API+`products/${id}`, productUpd)
  }


  // Actualiza varios productos a la vez
  public updateBulk(products:Product[]){
    return this.http.patch<any>(this.URL_API+`products/`, products)
  }


  // FALTA RUTAS CON QUERYS
  
  public getAllFiltered (filter:FilterShop){
    let query = ''
    for (const property in filter) {
      if(filter[property]){
        if(query== '') { query+='?'}else {query+='&'} 
        query += `${property}=${filter[property]}`
      }
    }
    console.log(query)
    return this.http.get<any>(this.URL_API + 'products'+ query)
  }

  public createTestProducts (product:Product){
    return this.http.post<any>(this.URL_API + 'products?multiples=true', product)
  }
}


