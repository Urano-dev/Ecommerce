import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { CloudinaryServService } from 'src/app/services/cloudinary-serv.service'

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

  //DECLARACIÓN DE ESTADOS ************************************************
  sending:boolean=false 
  received:boolean=false
  error:any={
    error:false,
    message:''
  }

  newProductForm:FormGroup

  // DATA Y FORM **************************************************************
   
  constructor(
    private _products:ProductsService,
    private _form:FormBuilder,
    private _router:Router,
    private _cloud:CloudinaryServService) { 
      this.newProductForm = this._form.group({
        name:['', Validators.required],
        description:['', Validators.required],
        stock:['', Validators.required],
        cost:['', Validators.required],
        brand:['', Validators.required],
        img:[''],
      })
    }


    

  ngOnInit(): void {  }

  // CREAR
onCreate(){
  this.sending=true
  const dataForm = this.newProductForm.value
  if(!dataForm.img){
    dataForm.img ='https://cdn3.iconfinder.com/data/icons/graphic-and-web-design/64/PACKAGING_DESIGN-1024.png'
  }
 this._products.create(dataForm).subscribe(
  res => { console.log(res)},
  err => console.error(err)
 )

}

// LOGICA CLOUDINARY
  seleccionarImagen(event:any){
    const file:File = event.target.files[0];
    this.UploadToCloudinary(file)
  }

  UploadToCloudinary(file:File){
    const formData = new FormData();
    formData.append('file', file);
   
    this._cloud.uploadNewProductPhoto(formData).subscribe(
      res=>{
        console.log(res)
        this.newProductForm.value.img=res.url
      },
      err=>{ })
    }

    

// *************************************** funcionalidad de botones al finalizar ****************************************
reintentar(){
  this.sending=false
  this.received=false
  this.error.error=false
}

}