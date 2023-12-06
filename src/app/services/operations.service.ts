import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionTypeInfo } from '../interfaces/transaction-type-info';
import { ApiUrls } from '../enums/api-urls';
import { TransferRequest } from '../interfaces/transfer-request';
import { TransactionDTO } from '../interfaces/transaction-dto';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http:HttpClient) {}

  getOperations():Observable<TransactionTypeInfo[]>{
    return this.http.get<TransactionTypeInfo[]>(ApiUrls.getOperations);
  }
  transfer(transferRequest:TransferRequest):Observable<TransactionDTO>{
    return this.http.post<TransactionDTO>(ApiUrls.transfer, transferRequest);
  }
  deposit(formData:FormData):Observable<TransactionDTO>{
    return this.http.post<TransactionDTO>(ApiUrls.deposit, formData);
  }
  withdrawal(formData:FormData):Observable<TransactionDTO>{
    return this.http.post<TransactionDTO>(ApiUrls.withdrawal, formData);
  }
}
