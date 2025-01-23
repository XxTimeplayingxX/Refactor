import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CitaMedica, CitaMedicaDTO } from '../../../doctores/citaMedica';
import { ReactiveFormsModule } from '@angular/forms';
import { CompartirDatosService } from '../../../services/compartir-datos.service';
import { Persona } from '../../listado/Paciente';
import { CitaMedicaService } from '../../../services/cita-medica.service';

@Component({
  selector: 'app-listado-atencion',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './listado-atencion.component.html',
  styleUrl: './listado-atencion.component.css',
})
export class ListadoAtencionComponent implements OnInit {
  ngOnInit(): void {
    this.getData();
  }
  citaMedicaService = inject(CitaMedicaService);
  enviarDatosService = inject(CompartirDatosService)

  citaMedica = <CitaMedica[]>[];

  getData() {
    this.citaMedicaService.getData().subscribe((data)=>{
      console.log(data)
      this.citaMedica = data;
    })
  }

  atenderPaciente(citaMedica: CitaMedica){
    this.enviarDatosService.enviarDatos(citaMedica);
  }


}
