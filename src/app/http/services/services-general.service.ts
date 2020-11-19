import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { UserModel } from '../../models/user.model';
import { ResoltadoCovidModel } from '../../models/resultados-covid.model';
import { AnalisisModel } from '../../models/analisis.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesGeneralService {
  // protected urlApi = 'https://iush-app.herokuapp.com/autenticacion';
  protected urlApi = 'http://localhost:3000/analisis';
  protected urlApiRegistros = ' http://localhost:3000/registros';


  protected datosMasivos = 'https://datos.gov.co/resource/gt2j-8ykr.json?fecha_reporte_web=11/11/2020%200:00:00&$limit=1000&$offset=100https://datos.gov.co/resource/gt2j-8ykr.json?fecha_reporte_web=11/11/2020%200:00:00&$limit=200&$offset=100'
  public usuario: UserModel = null;
  constructor(
    private http: HttpClient
  ) { }

  public consultarServUsuarios(){
    return this.http.get<UserModel[]>(this.urlApi);
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

  public consultarRegistros(){
    return this.http.get<ResoltadoCovidModel[]>(this.urlApiRegistros + '/');
  }

  public consultarAnalisis(){
    return this.http.get<AnalisisModel[]>(this.urlApi + '/');
  }


  // tslint:disable-next-line: adjacent-overload-signatures
  public consultarUsuario(usuario: UserModel){
    return this.http.post<UserModel[]>(this.urlApi, usuario);
  }
}
