import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TransactionTypeInfo } from '../interfaces/transaction-type-info';
import { ApiUrls } from '../enums/api-urls';
import { TransferRequest } from '../interfaces/transfer-request';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http:HttpClient) {}

  getOperations():Observable<TransactionTypeInfo[]>{
    return this.http.get<TransactionTypeInfo[]>(ApiUrls.getOperations);
  }
  transfer(transferRequest:TransferRequest):Observable<any>{
    return this.http.post(ApiUrls.transfer, transferRequest);
  }
}
