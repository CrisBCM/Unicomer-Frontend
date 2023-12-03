import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../interfaces/client';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../enums/api-urls';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private client$: BehaviorSubject<Client | null> = new BehaviorSubject<Client | null>(null);

  constructor(private http:HttpClient) {}

  getClient(dni:string):Observable<Client>{
    return this.http.get<Client>(`${ApiUrls.getClient}/${dni}`);
  }

  set setClient(client:Client | null){
    this.client$.next(client);
  }
  
  get getClientAsObservable(){
    return this.client$.asObservable();
  }
}
