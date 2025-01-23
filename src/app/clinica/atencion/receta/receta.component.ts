import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormularioRecetaComponent } from '../formulario-receta/formulario-receta.component';
import { CompartirDatosService } from '../../../services/compartir-datos.service';
import { Persona } from '../../listado/Paciente';
import { CitaMedica } from '../../../doctores/citaMedica';

@Component({
  selector: 'app-receta',
  imports: [RouterLink, FormularioRecetaComponent],
  templateUrl: './receta.component.html',
  styleUrl: './receta.component.css',
})
export class RecetaComponent {
  dataService = inject(CompartirDatosService);
  
  ngOnInit(): void {
    this.dataService.data$.subscribe((datos) => {
      this.modelo = datos;
    });
  }

  accion = 'Agregar'

  EnviarListaCitaMedica(citaMedica:any){
    console.log(citaMedica);
  }

  CambiarNombreAccion(accionInput:string){
    this.accion = accionInput;
  }

  modelo!: CitaMedica;
}
