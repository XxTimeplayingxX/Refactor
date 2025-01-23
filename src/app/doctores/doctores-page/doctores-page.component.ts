import { Component, inject, OnInit } from '@angular/core';
import { ElegirDoctorComponent } from "../elegir-doctor/elegir-doctor.component";
import { RouterLink } from '@angular/router';
import { CompartirDatosService } from '../../services/compartir-datos.service';
import { Persona } from '../../clinica/listado/Paciente';

@Component({
  selector: 'app-doctores-page',
  imports: [ElegirDoctorComponent, RouterLink],
  templateUrl: './doctores-page.component.html',
  styleUrl: './doctores-page.component.css'
})
export class DoctoresPageComponent implements OnInit{
  dataService = inject(CompartirDatosService);

  ngOnInit(): void {
    this.dataService.data$.subscribe((datos) => {
      this.modelo = datos;
    });
  }

  modelo!: Persona;

  
}
