import { Component, EventEmitter, inject, OnInit, Output, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Persona, PersonaDTO } from '../Paciente';
import { CompartirDatosService } from '../../../services/compartir-datos.service';
import { PacienteService } from '../../../services/paciente.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AutorizadoComponent } from "../../../seguridad/autorizado/autorizado.component";
import { SeguridadService } from '../../../seguridad/seguridad.service';

@Component({
  selector: 'app-listado-paciente',
  imports: [RouterLink, AutorizadoComponent],
  templateUrl: './listado-paciente.component.html',
  styleUrl: './listado-paciente.component.css'
})
export class ListadoPacienteComponent implements OnInit{
  ngOnInit(): void {
    this.getData();
  }
  datasService = inject(CompartirDatosService);
  pacienteService = inject(PacienteService);
  seguridadService = inject(SeguridadService);
  toastSvc = inject(ToastrService);
  router = inject(Router);

 

  @Output()
  pacienteOutput = new EventEmitter<PersonaDTO>


  pacientes = <Persona[]>[];

  
  getData(){
    this.pacienteService.getData().subscribe(datos=>{
      this.pacientes = datos;
    })
  }
  
  EditarPaciente(paciente:Persona){
    const persona = paciente;    

    this.pacienteOutput.emit(persona);
    this.datasService.enviarDatos(persona);
  }

  citaMedica(paciente:Persona){
    const persona = paciente;    

    this.datasService.enviarDatos(persona);

    this.router.navigate(['/doctor']);
  }

  EliminarPaciente(paciente:Persona){
    this.pacienteService.deleteData(paciente.pacienteID).subscribe(() => {
      this.toastSvc.info('Pacinte Removido', 
        'Se ha removido un paciente')
      this.getData();
    });
  }
}
