import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-withdrawal-dashboard',
  templateUrl: './withdrawal-dashboard.component.html',
  styleUrls: ['./withdrawal-dashboard.component.css']
})
export class WithdrawalDashboardComponent {

  withdrawalForm:FormGroup;
  currentClient$:Observable<Client | null>;
  succesMsg:string = "";
  toggleModal:boolean = false;
  
  constructor(private fb:FormBuilder, private clientService:ClientService, private operationsService:OperationsService){

    this.currentClient$ = clientService.getClientAsObservable;

    this.withdrawalForm = fb.group({
      'fromCardNumber': ['', [Validators.required]],
      'amount': ['', [Validators.required, Validators.min(1)]]
    })

  }
  get fromCardNumber(){
    return this.withdrawalForm.get('fromCardNumber') as FormControl;
  }
  get amount(){
    return this.withdrawalForm.get('amount') as FormControl;
  }

  withdrawal(){
    if(this.withdrawalForm.valid){
      const formData = new FormData();

      formData.append('fromCardNumber', this.fromCardNumber.value);
      formData.append('amount', this.amount.value);

      this.operationsService.withdrawal(formData).subscribe({
        complete:()=>{
          this.clientService.subtractAmount(this.amount.value, this.fromCardNumber.value);
          this.toggleModal = false;
          this.withdrawalForm.reset();
          this.succesMsg = "Extraccion realizada con exito!";
        },
        error:()=>{

        }
      })
    }
  }
}
