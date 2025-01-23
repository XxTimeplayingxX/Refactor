import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormularioPacienteComponent } from '../formulario-paciente/formulario-paciente.component';
import { Persona, PersonaDTO } from '../Paciente';
import { FormBuilder, Validators } from '@angular/forms';
import { CompartirDatosService } from '../../../services/compartir-datos.service';
import { ToastrService } from 'ngx-toastr';
import { PacienteService } from '../../../services/paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-paciente',
  imports: [FormularioPacienteComponent],
  templateUrl: './editar-paciente.component.html',
  styleUrl: './editar-paciente.component.css',
})
export class EditarPacienteComponent implements OnInit {
  dataService = inject(CompartirDatosService);
  pacienteService = inject(PacienteService);
  toastSvc = inject(ToastrService);
  router = inject(Router);

  ngOnInit(): void {
    this.dataService.data$.subscribe((datos) => {
      this.modelo = datos;
    });
  }

  modelo?: Persona;

  personaEditada(persona: Persona) {
    this.pacienteService.updateData(persona.pacienteID, persona).subscribe({
      next: (newPaciente) => {
        this.toastSvc.success(
          'Actualización exitosa',
          'Se actualizaron los datos del usuario'
        );
      },
      error: (err) => {
        this.toastSvc.error('Ocurrió un error al editar al paciente');
      },
    });
  }
}
