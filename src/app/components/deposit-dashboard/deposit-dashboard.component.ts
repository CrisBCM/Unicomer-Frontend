import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { TransactionDTO } from 'src/app/interfaces/transaction-dto';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-deposit-dashboard',
  templateUrl: './deposit-dashboard.component.html',
  styleUrls: ['./deposit-dashboard.component.css']
})
export class DepositDashboardComponent {
  toggleModal:boolean = false;
  depositForm:FormGroup;
  currentClient$:Observable<Client | null>;
  errorMsg:string = "";
  succesMsg:string = "";
  
  constructor(private fb:FormBuilder, private clientService:ClientService, private operationsService:OperationsService, private transactionService:TransactionService){

    this.currentClient$ = clientService.getClientAsObservable;

    this.depositForm = fb.group({
      'toCardNumber': ['', [Validators.required]],
      'amount': ['', [Validators.required, Validators.min(1)]]
    })
  }

  get toCardNumber(){
    return this.depositForm.get('toCardNumber') as FormControl;
  }
  get amount(){
    return this.depositForm.get('amount') as FormControl;
  }

  deposit(){

    if(this.depositForm.valid){

      const formData = new FormData();
      
      formData.append('toCardNumber', this.toCardNumber.value);
      formData.append('amount', this.amount.value);

      this.operationsService.deposit(formData).subscribe({
        next:(transaction:TransactionDTO)=>{
          this.transactionService.addNewTransaction = transaction;
        },
        complete: ()=> {
          this.clientService.addIncome(this.amount.value);
          this.clientService.addAmount(this.amount.value, this.toCardNumber.value);

          this.succesMsg = 'Deposito exitoso'
          this.toggleModal = false;
          this.depositForm.reset();
        },

        error: (err:any)=> {this.errorMsg = err.error}

      })
    }
    
  }
}
