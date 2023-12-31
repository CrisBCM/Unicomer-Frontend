import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ClientInfo } from 'src/app/interfaces/client-info';
import { TransactionDTO } from 'src/app/interfaces/transaction-dto';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-modal-transaction',
  templateUrl: './modal-transaction.component.html',
  styleUrls: ['./modal-transaction.component.css']
})
export class ModalTransactionComponent {
  @Output() closeModal = new EventEmitter<boolean>;
  clientInfo$:Observable<ClientInfo | null>;
  currentClient$:Observable<Client | null>;
  transactionForm:FormGroup;
  emailToTransfer:string = "";
  selectedCardNumber:string = "";
  amountOfSelectedCard:number = 0;

  @Output() succesMsg = new EventEmitter<string>;

  errorMsg:string = "";

  constructor(private clientService:ClientService, private fb:FormBuilder, private operationsService:OperationsService, private transactionService:TransactionService){
    this.clientInfo$ = clientService.getClientInfoAsObservable;
    this.currentClient$ = clientService.getClientAsObservable;

    this.transactionForm = fb.group({
      'fromCardNumber': ['', [Validators.required]],
      'toCardNumber': ['', [Validators.required]],
      'amount' : ['', [Validators.required, Validators.min(1)]]
    })
  }

  get fromCardNumber(){
    return this.transactionForm.get('fromCardNumber') as FormControl;
  }
  get toCardNumber(){
    return this.transactionForm.get('toCardNumber') as FormControl;
  }
  get amount(){
    return this.transactionForm.get('amount') as FormControl;
  }

  transfer(){
    if(this.transactionForm.valid){
      this.operationsService.transfer(this.transactionForm.value).subscribe({
        next : (transaction: TransactionDTO) => {
          this.transactionService.addNewTransaction = transaction;
        },
        complete : () =>{
          this.clientService.subtractAmount(this.amount.value, this.fromCardNumber.value);
          this.clientService.addEgress(this.amount.value);
          this.closeModal.emit(false);
          this.succesMsg.emit('La transferencia se realizo con exito!');
        },
        error : (err:any) => this.errorMsg = err.error
      })
    }
  }
  showAmountOfSelectedCard(){

    this.selectedCardNumber = this.fromCardNumber.value;

    this.currentClient$.subscribe(currentClient =>{
      if(currentClient?.cards){

        let selectedCard = currentClient.cards.find(card => card.number == this.selectedCardNumber)

        if(selectedCard) {
          this.amountOfSelectedCard = selectedCard.balance;
        }
      }
    })
  }

}
