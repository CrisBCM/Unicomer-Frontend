import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { TransactionDTO } from 'src/app/interfaces/transaction-dto';
import { ClientService } from 'src/app/services/client.service';
import { TokenService } from 'src/app/services/token.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { PaginationButtonsComponent } from '../pagination-buttons/pagination-buttons.component';
import { IncomeDTO } from 'src/app/interfaces/income-dto';
import { EgressDTO } from 'src/app/interfaces/egress-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  client$:Observable<Client | null>;
  transactions$:Observable<TransactionDTO[] | null>;
  transactions!:TransactionDTO[] | null;
  currentPage: number = 1;
  numberOfTransactionsToShow: number = 5;
  onDestroy$:Subject<boolean> = new Subject();
  @ViewChild('pagination') paginationBtns!:PaginationButtonsComponent;
  monthlyIncome$:Observable<IncomeDTO | null>;
  monthlyEgress$:Observable<EgressDTO | null>;

  constructor(private clientService:ClientService, private transactionService:TransactionService){
    this.client$ = clientService.getClientAsObservable;
    this.transactions$ = this.transactionService.transactionsAsObservable;
    this.monthlyIncome$ = clientService.getMonthlyIncomeAsObservable;
    this.monthlyEgress$ = clientService.getMonthlyEgressAsObservable;
  }
  ngOnInit(): void {
    this.transactionService.transactionsAsObservable.pipe(takeUntil(this.onDestroy$)).subscribe(transactions =>{
      this.transactions = transactions;
    });

    this.clientService.getMonthlyIncome().subscribe({
      next:(income:IncomeDTO) =>{
        this.clientService.setMonthlyIncome = income;
      }
    })
    this.clientService.getMonthlyEgress().subscribe({
      next:(egress:EgressDTO) =>{
        this.clientService.setMonthlyEgress = egress;
      }
    })
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }

  resetButtons(){
    this.currentPage = 1;
    this.paginationBtns.currentPage = this.currentPage;
  }
  get paginatedTransactions() {
    const start = (this.currentPage - 1) * this.numberOfTransactionsToShow;
    const end = start + this.numberOfTransactionsToShow;

    return this.transactions?.slice(start, end);
  }
  getName(clientName:string, fromName:string, toName:string){
    return toName == clientName ? fromName : toName;
  }
  

}
