import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { FormularioPacienteComponent } from "../formulario-paciente/formulario-paciente.component";
import { PersonaDTO } from '../Paciente';
import { PacienteService } from '../../../services/paciente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-paciente',
  imports: [FormularioPacienteComponent],
  templateUrl: './crear-paciente.component.html',
  styleUrl: './crear-paciente.component.css'
})
export class CrearPacienteComponent {

  pacienteService = inject(PacienteService);
  toastSvc = inject(ToastrService);
  router = inject(Router)

  personaCreada(persona:PersonaDTO){
    this.pacienteService.addData(persona).subscribe((newPaciente)=>{
      this.toastSvc.success('Se ha agregado un paciente', 'Paciente agregado')
      this.router.navigate(['/'])
    })
  }
  
}
