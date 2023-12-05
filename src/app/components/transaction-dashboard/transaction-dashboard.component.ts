import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientInfo } from 'src/app/interfaces/client-info';
import { ClientService } from 'src/app/services/client.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-transaction-dashboard',
  templateUrl: './transaction-dashboard.component.html',
  styleUrls: ['./transaction-dashboard.component.css']
})
export class TransactionDashboardComponent {

  clientsInfo$:Observable<ClientInfo[]>;
  toggleModal:boolean = false;

  constructor(private clientService:ClientService, private tokenService:TokenService){
    let tokenDecoded = tokenService.currentTokenDecodedAsValue;
    this.clientsInfo$ = clientService.getClientsInfo(tokenDecoded.client_id);
  }

  transaction(clientInfo:ClientInfo){
    this.clientService.setClientInfo = clientInfo;
    this.toggleModal = true;
  }
}
