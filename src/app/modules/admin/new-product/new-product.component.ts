import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { CloudinaryServService } from 'src/app/services/cloudinary-serv.service'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

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
    private _cloud:CloudinaryServService,
    public dialog: MatDialog) { 
      this.newProductForm = this._form.group({
        name:['', Validators.required],
        description:['', Validators.required],
        stock:['', Validators.required],
        cost:['', Validators.required],
        brand:['', Validators.required],
        img:[''],
      })
    }


    

  ngOnInit(): void { 
    this.openDialog('New product', 'Product successfully created!','OK')
   }

  // CREAR
onCreate(){
  this.sending=true
  const dataForm = this.newProductForm.value
  if(!dataForm.img){
    dataForm.img ='https://cdn3.iconfinder.com/data/icons/graphic-and-web-design/64/PACKAGING_DESIGN-1024.png'
  }

 this._products.create(dataForm).subscribe(
  res => {
    this.sending=false
    this.openDialog('New product', 'Product successfully created!','Ok')

    },
  err => {
    this.sending=false
    this.openDialog('Error', err.message, 'retry')
  }
 )
}

// LOGICA CLOUDINARY
selectImg(event:any){
    const file:File = event.target.files[0];
    this.UploadToCloudinary(file)
  }

  UploadToCloudinary(file:File){
    const formData = new FormData();
    formData.append('file', file);
   
    this._cloud.uploadNewProductPhoto(formData).subscribe(
      res=>{
        this.newProductForm.value.img=res.url
      },
      err=>{ })
    }

openDialog(title:string, message:string, button:string, cb?:any){

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data:{
            title: title,
            message:message,
            button: button
          }, 
          maxWidth: '450px'
      });

      dialogRef.afterClosed().subscribe(result => {
        this.reintentar()
        
        if(result){
          cb?cb():''
        }
        
      });
    }

// *************************************** funcionalidad de botones al finalizar ****************************************
reintentar(){
  this.sending=false
  this.received=false
  this.error.error=false
}

}