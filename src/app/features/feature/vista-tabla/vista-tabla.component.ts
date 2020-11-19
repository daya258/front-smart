import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesGeneralService } from '../../../http/services/services-general.service';
import { ResoltadoCovidModel } from '../../../models/resultados-covid.model';
import { AnalisisModel } from '../../../models/analisis.model';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-vista-tabla',
  templateUrl: './vista-tabla.component.html',
  styleUrls: ['./vista-tabla.component.scss']
})
export class VistaTablaComponent implements OnInit {

  // @ViewChild('tablaVista') tablaVista:Table;
 public registros:ResoltadoCovidModel[] = [];
 public registrosAnalisis:AnalisisModel[] = [];

  constructor(
    private listUsariosService: ServicesGeneralService
  ) {
    this.listarUsuarios();
    this.listarAnalisis();
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

  private listarAnalisis(){
    this.listUsariosService.consultarAnalisis().subscribe(dato => {
      this.registrosAnalisis = [];
      this.registrosAnalisis = dato;
      console.log(dato);
    });
      }

}
