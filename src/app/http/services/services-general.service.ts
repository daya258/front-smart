import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesGeneralService {
  // protected urlApi = 'https://iush-app.herokuapp.com/autenticacion';
  protected urlApi = 'http://localhost:3000/usuarios';

  protected datosMasivos = 'https://datos.gov.co/resource/gt2j-8ykr.json?fecha_reporte_web=11/11/2020%200:00:00&$limit=1000&$offset=100https://datos.gov.co/resource/gt2j-8ykr.json?fecha_reporte_web=11/11/2020%200:00:00&$limit=200&$offset=100'
  public usuario: UserModel = null;
  constructor(
    private http: HttpClient
  ) { }

  public consultarServUsuarios(){
    return this.http.get<UserModel[]>(this.urlApi);
  }
  public consultarUsuario(id: any){
    return this.http.get<UserModel>(this.urlApi + '/' + 1);
  }

  // let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
         
  // return this.http.post(this.url+'productos',{headers: headers});

  public guardarStorage(user: UserModel) {
    localStorage.setItem('usuario', JSON.stringify(user));
  }

  public cargarStorage() {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }

  public getUsuario(){
    return this.usuario;
  }
}
