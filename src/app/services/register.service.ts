import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiUrls } from '../enums/api-urls';
import { TokenService } from './token.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient, private tokenService:TokenService, private loginService:LoginService) {}

  register(formRegister:any):Observable<any>{
    return this.http.post(ApiUrls.register, formRegister).pipe(map(token =>{

      this.loginService.setNewToken(token);
      
    }));
  }
}
