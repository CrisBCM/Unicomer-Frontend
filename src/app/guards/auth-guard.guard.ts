import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuardGuard:CanActivateFn = () => {

  let client = localStorage.getItem('currentClient');
  let currentCLient;
  const router = inject(Router);

  if(client) currentCLient = JSON.parse(client);

  if(currentCLient && currentCLient.token){
    return true;
  }
  else{
    router.navigate(['/auth/login']);
    return false;
  }
}
