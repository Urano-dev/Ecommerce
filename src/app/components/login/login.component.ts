import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup


constructor(private fb: FormBuilder, private _auth:AuthService){
  this.loginForm= this.fb.group({
    email_address:['', [Validators.required]],
    password:['', [Validators.required]]
  })
}


onLogin(){
  if(this.loginForm.invalid) return;
  this._auth.login(this.loginForm.value).subscribe(
    res => {
      this._auth.setIsLogged(true)
      //window.location.reload();
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
