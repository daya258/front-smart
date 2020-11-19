import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VistaTablaComponent } from '../app/features/feature/vista-tabla/vista-tabla.component';
import { AuthInterceptorService } from './filtrar-http/auth-interceptor.service';
import { FeatureComponent } from './features/feature/feature.component';
import { LoginComponent } from '../app/features/feature/login/login.component';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VistaTablaComponent,
    FeatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule
  ],
  providers: [
   {
     provide: HTTP_INTERCEPTORS,
     useClass: AuthInterceptorService,
     multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
