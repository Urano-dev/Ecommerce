import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CloudinaryServService } from 'src/app/services/cloudinary-serv.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
   //DECLARACIÓN DE ESTADOS ************************************************
   sending:boolean=false 
   received:boolean=false
   error:any={
     error:false,
     message:''
   }
 
  editProductForm:FormGroup
  productParam!:string
  dataProduct!:any 
   
  constructor( 
    private _route: ActivatedRoute, 
    private _product:ProductsService,
    private _form:FormBuilder,
    private _cloud:CloudinaryServService
    ){
      this.editProductForm = this._form.group({
        name:['', Validators.required],
        description:['', Validators.required],
        stock:['', Validators.required],
        cost:['', Validators.required],
        brand:['', Validators.required],
        img:[''],
      })
    }


  ngOnInit(): void {
    this._route.params.forEach((param: Params) => {
      this.productParam = param['id'];
    });
    if (this.productParam != undefined){
      this._product.getOne(this.productParam).subscribe(
        res => {this.dataProduct=res
          this.createFormGroup()},
        err => console.error(err)
      )
    }
  }

  createFormGroup(){
    console.log(this.dataProduct)
    this.editProductForm = this._form.group({
      name:[this.dataProduct.name, Validators.required],
      description:[this.dataProduct.description, Validators.required],
      stock:[this.dataProduct.stock, Validators.required],
      cost:[this.dataProduct.cost, Validators.required],
      brand:[this.dataProduct.brand, Validators.required],
      img:[this.dataProduct.img],
    })
  }

  onEdit(){}

  selectImg(event:any){
    const file:File = event.target.files[0];
    this.UploadToCloudinary(file)
  }

  UploadToCloudinary(file:File){
    const formData = new FormData();
    formData.append('file', file);
   
    this._cloud.uploadNewProductPhoto(formData).subscribe(
      res=>{
        console.log(res)
        this.editProductForm.value.img=res.url
      },
      err=>{ })
    }


    reintentar(){
      this.sending=false
      this.received=false
      this.error.error=false
    }
}
