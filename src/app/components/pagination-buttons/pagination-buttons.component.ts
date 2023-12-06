import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TransactionDTO } from 'src/app/interfaces/transaction-dto';

@Component({
  selector: 'app-pagination-buttons',
  templateUrl: './pagination-buttons.component.html',
  styleUrls: ['./pagination-buttons.component.css']
})
export class PaginationButtonsComponent {
  @Input() objectList!:TransactionDTO[] | null;
  @Input() currentPage:number = 1;
  @Output() emitCurrentPage = new EventEmitter<number>();
  numberOfPages: number = 0;
  @Input() numberOfTransactionsToShow: number = 0;
  arrayButtons: number[] = [];
  lastElementOfArray: number = 0;

  isMobile: boolean = window.innerWidth < 400;
  constructor() {}

  defineLastElement(){
    if (this.arrayButtons && this.arrayButtons.length > 0) {
      this.lastElementOfArray = this.arrayButtons.slice(-1)[0];
    }
  }

  defineNumberOfButtons(){
    let buttons = [];

    for (let i = 1; i <= this.numberOfPages; i++) {
      buttons.push(i);
    }
    this.arrayButtons = buttons;
  }

  defineNumberOfPages(){
    if (this.objectList) {

      this.numberOfPages = Math.ceil(

        this.objectList.length / this.numberOfTransactionsToShow

      );
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
   
    const screenWidth = event.target.innerWidth;
   
    this.isMobile = screenWidth < 470;
  }

  get listOfButtons(): number[] {
    
    this.defineNumberOfPages();
    this.defineNumberOfButtons();
    this.defineLastElement();
    
   
    let numberOfButtons = 0;

    this.isMobile ? (numberOfButtons = 1) : (numberOfButtons = 4);
    const inicio = this.currentPage - 1;
    const fin = this.currentPage + numberOfButtons;
    return this.arrayButtons.slice(inicio, fin);
  }

  changePage(newNumber: number) {
    this.currentPage = newNumber;
    this.emitCurrentPage.emit(this.currentPage);
   
  }
}
