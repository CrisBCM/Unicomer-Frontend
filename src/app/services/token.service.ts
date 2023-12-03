import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private currentToken$:BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentClient') || '{}'));
  private currentTokenDecoded$:BehaviorSubject<any> = new BehaviorSubject<any>("{}")

  constructor() {
   
  }

  get getCurrentToken(){
    return this.currentToken$.value;
  }
  set newCurrentToken(token:string){
    this.currentToken$.next(token);
  }
  set newCurrentTokenDecoded(token:string){
    this.currentTokenDecoded$.next(token)
  }

  get currentTokenDecodedAsObservable(){
    return this.currentTokenDecoded$.asObservable();
  }
}
