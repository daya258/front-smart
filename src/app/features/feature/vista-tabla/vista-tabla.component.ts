import { Component, OnInit } from '@angular/core';
import { ServicesGeneralService } from '../../../http/services/services-general.service';
import { ResoltadoCovidModel } from '../../../models/resultados-covid.model';

@Component({
  selector: 'app-vista-tabla',
  templateUrl: './vista-tabla.component.html',
  styleUrls: ['./vista-tabla.component.scss']
})
export class VistaTablaComponent implements OnInit {
 public registros:ResoltadoCovidModel[] = [];
  constructor(
    private listUsariosService: ServicesGeneralService
  ) {
    this.listarUsuarios();
   }

  ngOnInit(): void {
  }

  private listarUsuarios(){
this.listUsariosService.consultarRegistros().subscribe(dato => {
  this.registros = [];
  this.registros = dato;
  console.log(dato);
});
  }

}
