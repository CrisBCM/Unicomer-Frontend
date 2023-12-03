import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { repeatPasswordValidator } from 'src/app/shared/repeatPasswordValidator.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerForm!:FormGroup;

  showPassword:boolean = false;
  showConfirmPassword:boolean = false;
  errorMsg:string = "";

  constructor(private fb:FormBuilder, private registerService:RegisterService, private router:Router){
    this.registerForm = this.fb.group({
      'name' : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20) ]],
      'lastname' : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      'email' : ['', [Validators.required, Validators.minLength(4), Validators.email]],
      'documentType' : ['', Validators.required],
      'dni' : ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      'password' : ['', [Validators.required, Validators.minLength(4)]],
      'confirmPassword' : ['', Validators.required]
    })

    this.confirmPassword.setValidators([Validators.required, repeatPasswordValidator(this.password)]);
  }

  ngOnInit(): void {
    
  }

  get name(){
    return this.registerForm.get("name") as FormControl;
  }
  get lastname(){
    return this.registerForm.get("lastname") as FormControl;
  }
  get email(){
    return this.registerForm.get("email") as FormControl;
  }
  get documentType(){
    return this.registerForm.get("documentType") as FormControl;
  }
  get dni(){
    return this.registerForm.get("dni") as FormControl;
  }
  get password(){
    return this.registerForm.get("password") as FormControl;
  }
  get confirmPassword(){
    return this.registerForm.get("confirmPassword") as FormControl;
  }


  isValidField(name:string):boolean{
    const inputName = this.registerForm.get(name) as FormControl;

    return (inputName.dirty && !inputName.valid);
  }

  onSubmitRegister(){
    console.log(this.registerForm.value)
    if(this.registerForm.valid){
      this.registerService.register(this.registerForm.value).subscribe({
        next : () => {
        },
        complete : () =>{
          this.router.navigate(["/unicomer/home"]);
        },
        error : (err:any) => this.errorMsg = err.error
      })
    }
  }

}
