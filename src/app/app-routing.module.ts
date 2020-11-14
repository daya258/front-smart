import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/features/feature/login/login.component';

import { FeatureComponent } from './features/feature/feature.component';
import { UsuarioGuardService } from './guards/usuario-guard.service';


const routes: Routes = [
  { path: 'Lista-usuario', component: FeatureComponent, canActivate: [UsuarioGuardService],},
  { path: '**', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
