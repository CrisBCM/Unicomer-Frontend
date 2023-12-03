import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

export const IsLogedGuard:CanActivateFn = () => {
  let client = localStorage.getItem('currentClient');

  let currentClient;

  if(client) currentClient = JSON.parse(client);

  const router = inject(Router);

  if(currentClient && currentClient.token){

    router.navigate(['/unicomer/home']);
    return false;

  }else{
    return true;
  }
  
}
