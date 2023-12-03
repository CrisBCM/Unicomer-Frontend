import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb:FormBuilder){
    this.registerForm = this.fb.group({
      'name' : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20) ]],
      'lastname' : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      'email' : ['', [Validators.required, Validators.minLength(4), Validators.email]],
      'documentType' : ['', Validators.required],
      'documentNumber' : ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
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
  get documentNumber(){
    return this.registerForm.get("documentNumber") as FormControl;
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

  onSubmit(){
    console.log(this.registerForm.value);
  }

}
