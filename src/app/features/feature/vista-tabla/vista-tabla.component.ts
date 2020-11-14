import { Component, OnInit } from '@angular/core';
import { ServicesGeneralService } from '../../../http/services/services-general.service';

@Component({
  selector: 'app-vista-tabla',
  templateUrl: './vista-tabla.component.html',
  styleUrls: ['./vista-tabla.component.scss']
})
export class VistaTablaComponent implements OnInit {

  constructor(
    private listUsariosService: ServicesGeneralService
  ) {
    this.listarUsuarios();
   }

  ngOnInit(): void {
  }

  private listarUsuarios(){
this.listUsariosService.consultarServUsuarios().subscribe(dato => {
  console.log(dato);
});
  }

}
