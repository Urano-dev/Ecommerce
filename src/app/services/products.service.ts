import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  URL_API=environment._urlApi


  constructor(private http:HttpClient) { }


  public getAll():Observable<any[]>{
    return this.http.get<any>(this.URL_API + 'products')
  }

  public getAllLimit(number:number):Observable<any[]>{
    return this.http.get<any>(this.URL_API + 'products'+`?quantity=${number}`)
  }
  
  public getAllByCategory(categoryId:string):Observable<any[]>{
    return this.http.get<any>(this.URL_API + 'products'+`?categoryId=${categoryId}`)
  }


  public getLatest(){
    return this.http.get<any>(this.URL_API + 'products') // FALTA RUTA
  }


  public getOne(id:any){
    return this.http.get<any>(this.URL_API + 'products/'+id)
  }
  
  public create(product:any ){
    return this.http.post<any>(this.URL_API + 'products', product)
  }
  
  public updateOne(productUpd:any, id:string){
    return this.http.patch<any>(this.URL_API+`products/${id}`, productUpd)
  }

}
