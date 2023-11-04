import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { TermsComponent } from '../terms/terms.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit{

  isLogged:boolean=false
  isAdmin:boolean=false

  formUser:FormGroup
  
  errorImg:boolean=false
  
  sending:boolean=false 
  received:boolean=false
  error:any={
    error:false,
    message:''
  }
  // declaración

  constructor(
    private _auth: AuthService, 
    private _router:Router, 
    private fb:FormBuilder, 
    public dialog: MatDialog, 
    private _cookie:CookieService ) {
    
    this.formUser = this.fb.group(
      {
        email:['', Validators.required],
        username:['', Validators.required],
        password:['', Validators.required],
        firstname:['', Validators.required],
        lastname:['', Validators.required],
        dateBirth:['', Validators.required],
        dni:['' , Validators.required],
        telephone:['', Validators.required],
        homeAdress:['', Validators.required],
        country:['', Validators.required],
        state:['', Validators.required],
        city:['', Validators.required],
        zipCode:['', Validators.required],
        terms:['', [Validators.required, Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
  }

 // ************************** ENVIAR FORM ******************************** 
  // GUARDA ID DE SEDE ******************* CAMBIAR CUANDO NO SE PUEDAN ELIMINAR
onCreate(): void{
  this.sending=true
  this._auth.signup(this.formUser.value).subscribe(
    res=>{
      console.log(res)
    },
    err =>{console.error(err)}
  )
  }
  
// ***************************** MOSTRAR PASSWORD ******************************
showPassword(){
  let change  = document.getElementById("floatingPassword") as HTMLInputElement;
    let showPass  = document.getElementById("showPass") as HTMLElement
    if(change.type == "password"){
      change.type= "text";
      showPass.setAttribute("class", 'fa-solid fa-eye');
    }else{
      change.type = "password";
      showPass.setAttribute("class", 'fa-solid fa-eye-slash');
    }
}

  // ***************************** TERMINOS Y CONDICIONES ******************************
openDialog() {
    const dialogRef = this.dialog.open(TermsComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.formUser.controls['terms'].setValue(result)
    });
  }

// ******************************* SUBIR A BBDD *****************************************



retry(){
  this.sending=false
  this.received=false
  this.error.error=false
}
}