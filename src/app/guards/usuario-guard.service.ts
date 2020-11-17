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
<<<<<<< HEAD
    if (true) {
=======
    //if (this.usuarioStore.getUsuario()) {
       if (true) {
>>>>>>> dd7220a9e20ccd3868b6d614a5dde3e2636cdd38
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;

    }
  }
}
