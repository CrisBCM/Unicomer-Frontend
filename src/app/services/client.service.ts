import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../interfaces/client';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../enums/api-urls';
import { ClientInfo } from '../interfaces/client-info';
import { IncomeDTO } from '../interfaces/income-dto';
import { EgressDTO } from '../interfaces/egress-dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private client$: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);
  private clientInfo$:BehaviorSubject<ClientInfo | null> = new BehaviorSubject<ClientInfo | null>(null); 
  private moonthlyIncome$:BehaviorSubject<IncomeDTO | null> = new BehaviorSubject<IncomeDTO | null>(null);
  private moonthlyEgress$:BehaviorSubject<EgressDTO | null> = new BehaviorSubject<EgressDTO | null>(null);

  constructor(private http:HttpClient) {}

  getClientCardNumber(){
    if(this.client$.value){
      
      return this.client$.value.cards[0].number
    }
    return "";
  }
  getMonthlyIncome():Observable<IncomeDTO>{
    return this.http.get<IncomeDTO>(ApiUrls.monthlyIncome);
  }

  getMonthlyEgress():Observable<EgressDTO>{
    return this.http.get<EgressDTO>(ApiUrls.monthlyEgress);
  }

  getClient(dni:string):Observable<Client>{
    return this.http.get<Client>(`${ApiUrls.getClient}/${dni}`);
  }
  getClientsInfo(dni:string):Observable<ClientInfo[]>{
    return this.http.get<ClientInfo[]>(`${ApiUrls.getClientsInfo}/${dni}`);
  }
  set setMonthlyIncome(monthlyIncome:IncomeDTO){
    this.moonthlyIncome$.next(monthlyIncome);
  }
  get getMonthlyIncomeAsObservable(){
    return this.moonthlyIncome$.asObservable();
  }
  set setMonthlyEgress(monthlyEgress:EgressDTO){
    this.moonthlyEgress$.next(monthlyEgress);
  }
  get getMonthlyEgressAsObservable(){
    return this.moonthlyEgress$.asObservable();
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
  addEgress(amount:number){
    if(this.moonthlyEgress$.value){
      this.moonthlyEgress$.value.monthlyEgress = this.moonthlyEgress$.value?.monthlyEgress + amount;
    }
  }
  addIncome(amount:number){
    if(this.moonthlyIncome$.value){
      this.moonthlyIncome$.value.monthlyIncome = this.moonthlyIncome$.value?.monthlyIncome + amount;
    }
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
