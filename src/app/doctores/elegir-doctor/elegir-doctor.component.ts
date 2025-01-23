import { Component, inject, Input, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../doctor';
import { CitaMedicaDTO } from '../citaMedica';
import { Persona } from '../../clinica/listado/Paciente';
import { CitaMedicaService } from '../../services/cita-medica.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elegir-doctor',
  imports: [],
  templateUrl: './elegir-doctor.component.html',
  styleUrl: './elegir-doctor.component.css'
})
export class ElegirDoctorComponent implements OnInit{
  ngOnInit(): void {
    this.getDataDoctor();
  }

  @Input()
  paciente!: Persona

    doctorService = inject(DoctorService);
    toastSvc = inject(ToastrService);
    citaMedicaService = inject(CitaMedicaService)
    router = inject(Router)

    doctores = <Doctor[]>[];


    getDataDoctor(){
      this.doctorService.getData().subscribe((data) => {
        this.doctores = data;
      });
    }

    elegirDoctor(doctor: Doctor){
      const date = new Date();
      const formattedDate = `${date.getFullYear()} ${(
        '0' +
        (date.getMonth() + 1)
      ).slice(-2)} ${('0' + date.getDate()).slice(-2)}`;

      const citaMedica:CitaMedicaDTO = {
        citaMedicaID: 0,
        doctorID: doctor.doctorID,
        pacienteID: this.paciente.pacienteID,
        estado: 'En espera',
        recetaID: null,
        fecha: formattedDate
      }

      this.citaMedicaService.addData(citaMedica).subscribe({
        next:(newCita)=>{
          this.toastSvc.success(`Tu cita con el Dr. ${doctor.nombre} ${doctor.apellido} ha sido agendada`,
            'Cita agregada con éxito')
            this.router.navigate(['/'])
        },
        error: (err)=>{
          this.toastSvc.error('Por favor, intenta nuevamente. Si el problema persiste, contacta al soporte técnico.', 
            'No se pudo registrar la cita')
            this.router.navigate(['/'])
        }
      })


    }


  
}
