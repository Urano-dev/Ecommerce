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
/*
  * Trae lista de productos
  * @param filter : Filtro de productos
  */
getProducts (filter?:FilterShop){
  let query = ''
  if(filter){
  for (const property in filter) {
    if(filter[property]){
      if(query== '') { query+='?'}else {query+='&'} 
      query += `${property}=${filter[property]}`
    }
  }
}

  return this.http.get<any>(this.URL_API + 'products'+ query)
}


/*
* Trae un producto
* @param id : id de productos
*/
public getOne(id:any){
  return this.http.get<Product>(this.URL_API + 'products/'+id)
}
  
  /*
  * Crea un producto nuevo 
  * @param Product : Filtro de productos
  */
  public create(product:Product ){
    return this.http.post<any>(this.URL_API + 'products', product)
  }
  
  /*
  * Actualiza un producto 
  * @param productUpd : contenido de producto
  * @param id : Id del producto a actualizar
  */
  public updateOne(productUpd:Product, id:string){
    return this.http.patch<any>(this.URL_API+`products/${id}`, productUpd)
  }


  // Actualiza varios productos a la vez
  public updateBulk(products:Product[]){
    return this.http.patch<any>(this.URL_API+`products/`, products)
  }


  


  public createTestProducts (product:Product){
    return this.http.post<any>(this.URL_API + 'products?multiples=true', product)
  }

}


