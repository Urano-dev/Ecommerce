import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Brand, Category } from './models/utils';

@Injectable({
  providedIn: 'root'
})
export class GrouperService {
  URL_API=environment._urlApi


  constructor(private http:HttpClient) { }

  /*
  * Trae lista de productos
  * @param grouper = 1 | brand / 2 | Category
  */
getGrouper (grouper:number){
  return this.http.get<any>(this.URL_API + Groupers[grouper]).toPromise()
}

  /*
  * Trae lista de productos
  * @param grouper = 1 | brand / 2 | Category
  * @param id = id de brand categoría
  */
  getOneGrouper (grouper:number, id:number){
    return this.http.get<any>(this.URL_API + `${Groupers[grouper]}/${id}`).toPromise()
  }
  
  /*
  * Crea un agrupador
  * @param grouper = 1 | brand / 2 | Category
  * @param body = contenido del agrupador
  */

  createGrouper (grouper:number, body:Category|Brand){
    return this.http.post<boolean>(this.URL_API + `${Groupers[grouper]}`, body).toPromise()
  }

    /*
  * elimina un agrupador
  * @param grouper = 1 | brand / 2 | Category
  * @param id = id del agrupador
  */

    deleteGrouper (grouper:number, id:number){
      return this.http.delete<boolean>(this.URL_API + `${Groupers[grouper]}/${id}`).toPromise()
    }


  /*
  * Actualiza un agrupador
  * @param grouper = 1 | brand / 2 | Category
  * @param body = contenido del agrupador
  */
    updateGrouper (grouper:number, body:Category|Brand){
      return this.http.patch<boolean>(this.URL_API + `${Groupers[grouper]}/${body.id}`, body).toPromise()
    }


}


export enum Groupers{
  brands=1,
  categories = 2 
}