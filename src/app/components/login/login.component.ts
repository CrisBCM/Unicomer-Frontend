import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logInForm:FormGroup;
  errorMsg:string = "";

  constructor(fb:FormBuilder, private logInService:LoginService, private router:Router){

    this.logInForm = fb.group({
      'dni': ['', [Validators.required]],
      'documentType': ['DNI', [Validators.required]],
      'password': ['', [Validators.required]]
    })
  }

  submitLogIn(){
    if(this.logInForm.valid){
      this.logInService.logIn(this.logInForm.value).subscribe({
        next : () => {
        },
        complete : () =>{
          this.router.navigate(["/unicomer/home"]);
        },
        error : (err:any) => {
          if(typeof err.error == "string") this.errorMsg = err.error
          else{
            this.errorMsg = "Las credenciales proporcionadas son inválidas"
          }
        }
      })
    }
  }

}
