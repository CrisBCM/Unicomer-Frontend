import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  searchInputMobile:boolean = false;

  client$:Observable<Client | null>
  tokenDecoded:any;

  constructor(private clientService:ClientService, private tokenService:TokenService){
    
    this.client$ = clientService.getClientAsObservable;
  }

  ngOnInit(): void {
    this.tokenService.newCurrentTokenDecoded = jwtDecode(JSON.stringify(this.tokenService.getCurrentToken));

    this.tokenService.currentTokenDecodedAsObservable.subscribe(tokenDecoded =>{
      this.tokenDecoded = tokenDecoded;
    })

    this.clientService.getClient(this.tokenDecoded.client_id).subscribe((client:Client | null)=>{
      this.clientService.setClient = client;
    })

  }

}
