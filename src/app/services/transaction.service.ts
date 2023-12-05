import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiUrls } from '../enums/api-urls';
import { TransactionDTO } from '../interfaces/transaction-dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactions$:BehaviorSubject<TransactionDTO[] | null> = new BehaviorSubject<TransactionDTO[] | null>(null);

  constructor(private http:HttpClient) {

  }

  getMyTransactions(cardNumber:string):Observable<TransactionDTO[]>{
    console.log(cardNumber);
    return this.http.get<TransactionDTO[]>(`${ApiUrls.myTransactions}/${cardNumber}`);
  }

  set setTransactions(transactions:TransactionDTO[]){
    this.transactions$.next(transactions);
  }

  get transactionsAsObservable(){
    return this.transactions$.asObservable();
  }
}
