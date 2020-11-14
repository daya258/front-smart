import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicesGeneralService } from '../../../http/services/services-general.service';
import { UserModel } from '../../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicesGeneral: ServicesGeneralService
  ) {
    this.inicializarFormulario();
   }

  ngOnInit(): void {
  }

  public inicializarFormulario(){
    this.form = this.fb.group({
      usuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });
  }

  public addcl(){

  }

  public remcl(){

  }

  public activateInputs(){

  }

  public validarIngreso(){
    const datos = new UserModel();
    this.servicesGeneral.consultarUsuario(datos).subscribe(dato => {
      console.log(dato);
    });
  }

  private respuestaSuccess(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });
  }

  private respuestaError(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    });
  }

  get usuario(){
    return this.form.get('usuario');
  }

  get contrasena(){
    return this.form.get('contrasena');
  }

}
