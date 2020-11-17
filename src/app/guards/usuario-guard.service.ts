import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServicesGeneralService } from '../http/services/services-general.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioGuardService implements CanActivate {
  constructor(public usuarioStore: ServicesGeneralService,
    private router: Router) {}

  canActivate() {
    if (true) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;

    }
  }
}
