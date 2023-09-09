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

  public getOne(id:any){
    return this.http.get<any>(this.URL_API + 'products/'+id)
  }
  
  public create(product:any ){
    return this.http.post<any>(this.URL_API + 'products', product)
  }
  

}
