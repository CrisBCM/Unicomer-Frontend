import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  client$:Observable<Client | null>;

  constructor(private clientService:ClientService){
    this.client$ = clientService.getClientAsObservable;
  }

  

}
