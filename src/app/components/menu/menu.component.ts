import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  isMobileMenuActive:boolean = false;
  toggleModal:boolean = false;

  constructor(private clientService:ClientService, private tokenService:TokenService, private router:Router){}

  logout(){
    localStorage.clear();
    this.clientService.setClient = null;
    this.tokenService.newCurrentToken = '';

    this.router.navigate(['/auth']);
  }
}
