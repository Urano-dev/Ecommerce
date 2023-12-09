import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  URL_API=environment._urlApi


  constructor(private http:HttpClient) { }

  //brands
  //categories

  //Get trae Todo
  //Post
  //Delete
}

