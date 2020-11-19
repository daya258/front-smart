import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicesGeneralService } from '../../../http/services/services-general.service';
import { UserModel } from '../../../models/user.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public usuarioModel: UserModel;

  constructor(
    private fb: FormBuilder,
    private servicesGeneral: ServicesGeneralService,
    private router: Router
  ) {
    this.inicializarFormulario();
   }

  ngOnInit(): void {
    this.usuarioModel = new UserModel();
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
    console.log(this.form.valid);

    if (this.form.valid) {
      this.usuarioModel = new UserModel();
      // this.usuarioModel.usuario = this.usuario.value;
      // this.usuarioModel.contrasena = this.contrasena.value;

      // this.servicesGeneral.consultarUsuario(this.usuarioModel).subscribe(dato => {
        // TODO SE DEBE HACER VALIDACION
        // if(s){

        // }
      // });
      this.respuestaSuccess();
      this.router.navigate(['/Lista-usuario']);
    }else{
      this.respuestaError();
    }
    
    // const datos = new UserModel();
  }

  private respuestaSuccess(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Ingresaste satisfactorimente',
      showConfirmButton: false,
      timer: 1500
    });
  }

  private respuestaError(){
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: 'Ingresa la información solictada',
      footer: '<a href>Revizaste la informacion?</a>'
    });
  }

  get usuario(){
    return this.form.get('usuario');
  }

  get contrasena(){
    return this.form.get('contrasena');
  }

}
