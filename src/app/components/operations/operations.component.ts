import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionTypeInfo } from 'src/app/interfaces/transaction-type-info';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit{

  operations$:Observable<TransactionTypeInfo[]>;

  constructor(private operationsService:OperationsService){
    this.operations$ = this.operationsService.getOperations();
  }
  ngOnInit(): void {
    
  }

  aa(variable:string){
    console.log(variable);
  }
}
