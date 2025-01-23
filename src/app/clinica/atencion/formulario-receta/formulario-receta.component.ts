import {
  Component,
  EventEmitter,
  inject,
  INJECTOR,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Persona } from '../../listado/Paciente';
import { ToastrService } from 'ngx-toastr';
import { CitaMedica, CitaMedicaDTO } from '../../../doctores/citaMedica';
import { CompartirDatosService } from '../../../services/compartir-datos.service';
import { Router, RouterLink } from '@angular/router';
import { ModalRecetaComponent } from '../modal-receta/modal-receta.component';
import { Receta, RecetaDTO } from '../Receta';
import { RecetaService } from '../../../services/receta.service';
import { DetalleRecetaDTO } from '../DetalleReceta';
import { DetalleRecetaService } from '../../../services/detalle-receta.service';
import { NotificacionesDTO } from '../Notificaciones';
import { NotificacionService } from '../../../services/notificacion.service';
import { CitaMedicaService } from '../../../services/cita-medica.service';
import { FechaValidacion, primeraLetraMayuscula, soloNumeros, soloNumerosPositivos, soloTelefono } from '../../../shared/funciones/validaciones';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-formulario-receta',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './formulario-receta.component.html',
  styleUrl: './formulario-receta.component.css',
})
export class FormularioRecetaComponent{
  @Input()
  paciente!: Persona;

  @Input()
  citaMedicaInput!:CitaMedica;

  @Output()
  citaMedicaOutput = new EventEmitter<any>();

  @Output()
  accionOutput = new EventEmitter<string>();

  isModalVisible = false;
  idAEditar: number | undefined;

  private formBuilder = inject(FormBuilder);
  router = inject(Router);

  toastSvc = inject(ToastrService);
  dataService = inject(CompartirDatosService);
  recetaService = inject(RecetaService);
  detalleRecetaService = inject(DetalleRecetaService);
  notificacionesService = inject(NotificacionService);
  citaMedicaService = inject(CitaMedicaService)

  form = this.formBuilder.group({
    medicamento: ['', {validators: [ Validators.required, primeraLetraMayuscula()]} ],
    dosis: ['', {validators:[Validators.required, primeraLetraMayuscula()]}],
    frecuencia: ['', Validators.required],
    horaElegida: [''],
    fechaInicio: ['', Validators.required],
    duracion: ['',{validators:[Validators.required, soloNumerosPositivos()]}],
    instrucciones: ['', {validators:[Validators.required, primeraLetraMayuscula()]}],
  });

  ListDetalleReceta: any = [];

  guardarCambios() {
    const detalleReceta: any = {
      medicamento: this.form.controls.medicamento.value,
      dosis: this.form.controls.dosis.value,
      frecuencia: this.form.controls.frecuencia.value,
      horaElegida: this.form.controls.horaElegida.value,
      fechaInicio: this.form.controls.fechaInicio.value,
      duracion: this.form.controls.duracion.value,
      instrucciones: this.form.controls.instrucciones.value,
      telefono: this.paciente.telefono,
      nombre: this.paciente.nombre,
      apellido: this.paciente.apellido,
      pacienteId: this.paciente.pacienteID,
    };

    console.log(detalleReceta);
    console.log(new Date())

    if (this.idAEditar == undefined) {
      this.ListDetalleReceta.push(detalleReceta);
      this.toastSvc.success(
        'La receta ha sido agregada con éxito',
        'Receta agregada'
      );
    } else {
      this.ListDetalleReceta[this.idAEditar] = detalleReceta;
      this.idAEditar = undefined;
      this.accionOutput.emit('Agregar');
      this.toastSvc.info('Se ha actualizado una receta', 'Receta Actualizada');
    }
    this.form.reset();

    console.log(this.ListDetalleReceta);
    console.log(new Date())

    this.form.reset();
  }

  ObtenerErrorCampoMedicamento():string{
    let medicamento = this.form.controls.medicamento;

    if(medicamento.hasError('required')){
      return 'El campo nombre es requerido'
    }
    if(medicamento.hasError('primeraLetraMayuscula')){
      return medicamento.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }
  ObtenerErrorCampoDosis():string{
    let dosis = this.form.controls.dosis;

    if(dosis.hasError('required')){
      return 'El campo dosis es requerido'
    }
    if(dosis.hasError('primeraLetraMayuscula')){
      return dosis.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }
  ObtenerErrorCampoFechaInicio():string{
    let fechaInicio = this.form.controls.fechaInicio;

    if(fechaInicio.hasError('required')){
      return 'El campo fecha de Inicio es requerido'
    }
    if(fechaInicio.hasError('FechaValidacion')){
      return fechaInicio.getError('FechaValidacion').mensaje;
    }
    return '';
  }
  ObtenerErrorCampoDuracion():string{
    let duracion = this.form.controls.duracion;

    if(duracion.hasError('required')){
      return 'El campo duración es requerido'
    }
    if(duracion.hasError('soloNumerosPositivos')){
      return duracion.getError('soloNumerosPositivos').mensaje;
    }
    return '';
  }
  ObtenerErrorCampoInstrucciones():string{
    let instrucciones = this.form.controls.instrucciones;
    if(instrucciones.hasError('required')){
      return 'El campo instrucciones es requerido'
    }
    if(instrucciones.hasError('primeraLetraMayuscula')){
      return instrucciones.getError('primeraLetraMayuscula').mensaje;
    }
    return ''

  }



  VerCambios() {
    console.log('Estos datos han sido enviados ', this.ListDetalleReceta);
  }

  openModal() {
    this.isModalVisible = true;
  }

  handleClose() {
    this.isModalVisible = false;
  }

  EditarReceta(detalleReceta: any, index: number) {
    this.accionOutput.emit('Editar');

    this.idAEditar = index;

    this.form.patchValue({
      medicamento: detalleReceta.medicamento,
      dosis: detalleReceta.dosis,
      frecuencia: detalleReceta.frecuencia,
      horaElegida: detalleReceta.horaElegida,
      fechaInicio: detalleReceta.fechaInicio,
      duracion: detalleReceta.duracion,
      instrucciones: detalleReceta.instrucciones,
    });
  }
  EliminarReceta(index: number) {
    this.ListDetalleReceta.splice(index, 1);
    this.toastSvc.info('Se ha removido una receta', 'Receta Removida')
  }

  horasDespierto = ["06:00", "14:00", "20:00"];
  horasDespiertoDosVeces = ["06:00", "20:00"];

  EnviarCabios(detalleReceta: any) {
    console.log('Esta es el detalle Receta que nos vino', detalleReceta)
    const receta: RecetaDTO = {
      fechaEmision: new Date(),
      comentarios: this.ListDetalleReceta[0].instrucciones,
    };
    this.recetaService.addData(receta).subscribe({
      next: (newReceta: Receta) => {
        for (let i = 0; i < detalleReceta.length; i++) {
          const DetalleReceta: DetalleRecetaDTO = {
            Dosis: detalleReceta[i].dosis,
            Frecuencia: detalleReceta[i].frecuencia > 1
                ? `Cada ${detalleReceta[i].frecuencia} horas`
                : `Cada ${detalleReceta[i].frecuencia} hora`,
            Duracion:
            detalleReceta[i].duracion > 1
                ? `${detalleReceta[i].duracion} días`
                : `${detalleReceta[i].duracion} dia`,
            Instrucciones: detalleReceta[i].instrucciones,
            RecetaID: newReceta.recetaID,
            FechaInicio: new Date(detalleReceta[i].fechaInicio),
          };
          this.detalleRecetaService.addData(DetalleReceta).subscribe(
            {
              next: (newDetalleReceta)=>{
                let notificacionesPorDia = Math.floor(24 / this.ListDetalleReceta[i].frecuencia);
                for(let dia = 0; dia < detalleReceta[i].duracion; dia ++){
                  for (let n = 0; n < notificacionesPorDia; n++) {
                    let horaNotificacion: any;
                    if (notificacionesPorDia == 3) {
                      horaNotificacion =this.horasDespierto[n % this.horasDespierto.length];
                    } 
                    else if(notificacionesPorDia == 2) {
                      horaNotificacion =this.horasDespiertoDosVeces[n % this.horasDespiertoDosVeces.length];
                    }
                    else{
                      horaNotificacion = detalleReceta[i].duracionHoras; 
                      console.log(horaNotificacion);
                    }
                    let [horas, minutos] = horaNotificacion.split(":").map(Number);
                    let dstr: string = detalleReceta[i].fechaInicio;
                    let fechaDosis: Date = new Date(dstr + 'T00:00:00');
                    fechaDosis.setDate(fechaDosis.getDate() + dia);
                    fechaDosis.setHours(horas, minutos, 0, 0);
                    console.log('Hora: ' + fechaDosis);
                    const nuevaNotificacion: NotificacionesDTO = {
                      detalleRecetaID: newDetalleReceta.detalleRecetaID,
                      fechaDosis: new Date(fechaDosis).toISOString(),
                      enviado: false,
                      fechaEnviado: null,
                      telefono: detalleReceta[i].telefono,
                      mensaje:'Hola ' + detalleReceta[i].nombre +', es hora de tomar: ' + detalleReceta[i].medicamento,
                    };
                    this.notificacionesService
                      .addData(nuevaNotificacion)
                      .subscribe({
                        next: (newNotification) => {
                          console.log(
                            'Nueva Notificación agregada: ',
                            newNotification
                          );
                        },
                        error: (error) => {
                          console.log('Error', error);
                        },
                      });
                  }
                }
              },
              error:(error)=>{
                this.toastSvc.info('Ha ocurrido un error al momento de enviar la receta', 
                  'Error al momento de enviar la receta')
              }
            }
          )
        }
        const CitaMedicaUpdate:CitaMedicaDTO={
          citaMedicaID: this.citaMedicaInput.citaMedicaID,
          doctorID: this.citaMedicaInput.doctorID,
          pacienteID: this.citaMedicaInput.pacienteID,
          fecha: new Date(this.citaMedicaInput.fecha),
          estado: 'Atendido',
          recetaID: newReceta.recetaID
        };
        this.citaMedicaService.updateData(CitaMedicaUpdate.citaMedicaID, CitaMedicaUpdate).subscribe({
          next:(newCitaMedica)=>{
            this.toastSvc.success('Las recetas se enviaron con éxito', 'Receta enviada')
            this.ListDetalleReceta = null;
            this.router.navigate(['/atencion'])
          },
          error:(error)=>{
            this.toastSvc.info('No se pudieron enviar las recetas','Algo salió mal')
          }
        })

      },
      error: (error)=>{
        this.toastSvc.info('Error al enviar los datos', 'Ocurrió un error')
      }
    });

  }
}
