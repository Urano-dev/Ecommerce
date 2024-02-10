import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { CloudinaryServService } from 'src/app/services/cloudinary-serv.service'
import { Constants } from 'src/environments/app.setings';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brand, Category } from 'src/app/services/models/utils';
import { GrouperService } from 'src/app/services/product-groupers.service';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit{

  //DECLARACIÓN DE ESTADOS ************************************************
  sending:boolean=false 
  received:boolean=false
  error:any={
    error:false,
    message:''
  }
  productId:number
  newProductForm:FormGroup
  brands:Brand[]
  categories:Category[]
  title = 'New Product'
  // DATA Y FORM **************************************************************
   
  constructor(
    private _products:ProductsService,
    private _form:FormBuilder,
    private _router:Router,
    private _cloud:CloudinaryServService,
    private _actRoute:ActivatedRoute,
    private snackBar: MatSnackBar,
    private _dialog:DialogsService,
    private _groupers:GrouperService,
    ) { 
      this.newProductForm = this._form.group({
        name:['', Validators.required],
        description:['', Validators.required],
        stock:[null, Validators.required],
        cost:[null, Validators.required],
        CategoryId:[null],
        BrandId:[null],
        img:[''],
      })
    }

  ngOnInit(): void { 
    this.getSettings()

    this._actRoute.params.subscribe((param:any) => {
      this.productId = param['id'];
      if(this.productId) {
        this.title = 'Edit Product'
        this._products.getOne(this.productId)
        .then(data=>{
          this.newProductForm.controls['name'].setValue(data.name)
          this.newProductForm.controls['description'].setValue(data.description)
          this.newProductForm.controls['stock'].setValue(data.stock)
          this.newProductForm.controls['cost'].setValue(data.cost)
          this.newProductForm.controls['BrandId'].setValue(data.brandId?data.brandId:null)
          this.newProductForm.controls['CategoryId'].setValue(data.categoryId?data.categoryId:null)
          this.newProductForm.controls['img'].setValue(data.img)
        })
        .catch(()=> this.snackBar.open(Constants.ERROR_COMM))
      }})   
   }

   getSettings(){
    Promise.all([this._groupers.getGrouper(1), this._groupers.getGrouper(2)])
    .then(data=> {
      this.brands=data[0]
      this.categories=data[1]
    })
    .catch(()=> this.snackBar.open(Constants.ERROR_COMM))
   }

  // CREAR
onCreate(){
  this.newProductForm.markAllAsTouched()
  if(!this.newProductForm.valid){return}

  this.sending=true
  const dataForm = this.newProductForm.value

  if(!dataForm.img){
    dataForm.img ='https://cdn3.iconfinder.com/data/icons/graphic-and-web-design/64/PACKAGING_DESIGN-1024.png'
  }


  if(this.productId){
// OJO! CAMBIAR 'createTestProduct' por 'create'
this._products.updateOne(dataForm, this.productId).subscribe(
  res => {
    this.sending=false
    this._dialog.openDialog('New product', 'Product successfully Updated!','Ok')

    },
  err => {
    this.sending=false
    this._dialog.openDialog('Error', err.message, 'retry')
  }
 )
  }else{
// OJO! CAMBIAR 'createTestProduct' por 'create'
this._products.createTestProducts(dataForm).subscribe(
  res => {
    this.sending=false
    this._dialog.openDialog('New product', 'Product successfully created!','Ok')

    },
  err => {
    this.sending=false
    this._dialog.openDialog('Error', err.message, 'retry')
  }
 )}

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



// *************************************** funcionalidad de botones al finalizar ****************************************

reintentar(){
  this.sending=false
  this.received=false
  this.error.error=false
}

}