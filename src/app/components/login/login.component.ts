import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  loginForm: FormGroup
  isLogged!:boolean

constructor(private fb: FormBuilder, private _auth:AuthService, private _cookie:CookieService){
  this.loginForm= this.fb.group({
    email_address:['', [Validators.required]],
    password:['', [Validators.required]]
  })

  
}


ngOnInit(){
  this.isLogged=this._auth.getLogged()
}

onLogin(){
  if(this.loginForm.invalid) return;
  this._auth.login(this.loginForm.value).subscribe(
    res => {
      //this._auth.setIsLogged(true)
      //this.isLogged=this._auth.getLogged()

      console.log(res)
        this._cookie.set('user', this.loginForm.value.email_address, {path: '/'})
      for(let prop in res){
        this._cookie.set(prop, res[prop], {path: '/'})
      }
      this.isLogged= this._auth.updateLogin()
      window.location.reload();
    }, // guardar la info en una cookie
    err => alert(err.message)
  )
}


mostrarPassword(){
  let cambio  = document.getElementById("floatingPassword") as HTMLInputElement;
    let showPass  = document.getElementById("showPass") as HTMLElement
    if(cambio.type == "password"){
      cambio.type= "text";
      showPass.setAttribute("class", 'fa-solid fa-eye');
    }else{
      cambio.type = "password";
      showPass.setAttribute("class", 'fa-solid fa-eye-slash');
    }
}
}
