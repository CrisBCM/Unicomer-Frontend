import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { TransactionDTO } from 'src/app/interfaces/transaction-dto';
import { ClientService } from 'src/app/services/client.service';
import { TokenService } from 'src/app/services/token.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  client$:Observable<Client | null>;
  transactions$:Observable<TransactionDTO[] | null>;

  constructor(private clientService:ClientService, private transactionService:TransactionService){
    this.client$ = clientService.getClientAsObservable;
    this.transactions$ = this.transactionService.transactionsAsObservable;
  }
  ngOnInit(): void {
  }

  

}
