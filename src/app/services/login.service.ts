import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Observable, map } from 'rxjs';
import { ApiUrls } from '../enums/api-urls';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router:Router, private tokenService:TokenService) {}

  setNewToken(token:any){
    localStorage.setItem('currentClient', JSON.stringify(token));
      
    this.tokenService.newCurrentToken = JSON.parse(localStorage.getItem('currentClient') || '{}');
  }
  
  logIn(logInForm:any):Observable<any>{
    
    return this.http.post(ApiUrls.logIn, logInForm).pipe(map(token =>{

      this.setNewToken(token);

    }))
  }

}
