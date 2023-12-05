import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../interfaces/client';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../enums/api-urls';
import { ClientInfo } from '../interfaces/client-info';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private client$: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);
  private clientInfo$:BehaviorSubject<ClientInfo | null> = new BehaviorSubject<ClientInfo | null>(null); 

  constructor(private http:HttpClient) {}

  getClientCardNumber(){
    console.log("CLLLLIENT" + JSON.stringify(this.client$.value));
    if(this.client$.value){
      
      return this.client$.value.cards[0].number
    }
    return "";
  }
  getClient(dni:string):Observable<Client>{
    return this.http.get<Client>(`${ApiUrls.getClient}/${dni}`);
  }
  getClientsInfo(dni:string):Observable<ClientInfo[]>{
    return this.http.get<ClientInfo[]>(`${ApiUrls.getClientsInfo}/${dni}`);
  }
  set setClientInfo(clientInfo:ClientInfo){
    this.clientInfo$.next(clientInfo);
  }
  get getClientInfoAsObservable(){
    return this.clientInfo$.asObservable();
  }

  set setClient(client:Client | null){
    this.client$.next(client);
  }
  
  get getClientAsObservable(){
    return this.client$.asObservable();
  }

  subtractAmount(amount:number, fromCardNumber:string){
    if(this.client$.value){

      let indexFromCard = this.client$.value.cards.findIndex(card => card.number == fromCardNumber);
      
      this.client$.value.cards[indexFromCard].balance = this.client$.value.cards[indexFromCard].balance - amount;
    }
  }
  addAmount(amount:number, toCardNumber:string){
    if(this.client$.value){

      let indexFromCard = this.client$.value.cards.findIndex(card => card.number == toCardNumber);
      
      this.client$.value.cards[indexFromCard].balance = this.client$.value.cards[indexFromCard].balance + amount;
    }
  }

}
