import { Component, EventEmitter, inject, Input, model, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Persona, PersonaDTO } from '../Paciente';
import { Router, RouterLink } from '@angular/router';
import { CompartirDatosService } from '../../../services/compartir-datos.service';
import { PacienteService } from '../../../services/paciente.service';
import { LongitudCampo, primeraLetraMayuscula, soloTelefono } from '../../../shared/funciones/validaciones';
import { NgClass } from '@angular/common';
import { SeguridadService } from '../../../seguridad/seguridad.service';

@Component({
  selector: 'app-formulario-paciente',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './formulario-paciente.component.html',
  styleUrl: './formulario-paciente.component.css'
})
export class FormularioPacienteComponent implements OnInit{
  dataService = inject(CompartirDatosService);
  pacienteService = inject(PacienteService);

  ngOnInit(): void {
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
    

  }
  
  @Input()
  modelo?: Persona;

  @Output()
  personaCreada = new EventEmitter<PersonaDTO>();

  @Output()
  personaEditada = new EventEmitter<Persona>();

  id:number | undefined;

  router = inject(Router);

  private formbuilder = inject(FormBuilder);

  form = this.formbuilder.group(
    {
      nombre: ['',{validators: [Validators.required, primeraLetraMayuscula()]}],
      apellido: ['', {validators: [Validators.required, primeraLetraMayuscula()]}],
      cedula: ['', {validators:[ Validators.required, soloTelefono(), LongitudCampo()]}],
      telefono: ['', {validators:[Validators.required, soloTelefono(), LongitudCampo()]}],
      correo: ['', {validators:[Validators.required, Validators.email]}],
      historialMedico: ['', [Validators.required]]
    }
  )

  guardarCambios(){
    if(!this.form.valid){
      return;
    }
    
    if(!this.modelo){
      let persona: PersonaDTO;
       persona = this.form.value as PersonaDTO;
       this.personaCreada.emit(persona);
    }
    else{
      let persona: Persona;
      persona = this.form.value as Persona;
      persona.pacienteID = this.modelo.pacienteID;
      persona.activo = this.modelo.activo;
      
       this.personaEditada.emit(persona);
    }    
  }

  limpiarDataService(){
    this.dataService.enviarDatos(null);
  }

  ObtenerErrorCampoNombre():string{
    let nombre = this.form.controls.nombre;

    if(nombre.hasError('required')){
      return 'El campo nombre es requerido'
    }
    if(nombre.hasError('primeraLetraMayuscula')){
      return nombre.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }

  ObtenerErrorCampoApellido():string{
    let apellido = this.form.controls.apellido;

    if(apellido.hasError('required')){
      return 'El campo nombre es requerido'
    }
    if(apellido.hasError('primeraLetraMayuscula')){
      return apellido.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }

  ObtenerErrorCampoTelefono():string{
    let telefono = this.form.controls.telefono;

    if(telefono.hasError('required')){
      return 'El campo telefono es requerido'
    }
    if(telefono.hasError('soloTelefono')){
      return telefono.getError('soloTelefono').mensaje;
    }
    if(telefono.hasError('LongitudCampo')){
      return telefono.getError('LongitudCampo').mensaje;
    }
    return '';
  }

  ObtenerErrorCampoCedula():string{
    let cedula = this.form.controls.cedula;

    if(cedula.hasError('required')){
      return 'El campo cédula es requerido'
    }
    if(cedula.hasError('soloTelefono')){
      return cedula.getError('soloTelefono').mensaje;
    }
    if(cedula.hasError('LongitudCampo')){
      return cedula.getError('LongitudCampo').mensaje;
    }
    return '';
  }

  ObtenerErrorCampoCorreo():string{
    let correo = this.form.controls.correo;

    if(correo.hasError('required')){
      return 'El campo correo es requerido'
    }
    if(correo.hasError('email')){
      return 'Debe contener la siguiente estructura example@correo.com'
    }
    return '';
  }

  ObtenerErrorCampoHistorialMedico():string{
    let historialMedico = this.form.controls.historialMedico;

    if(historialMedico.hasError('required')){
      return 'El campo historial Medico es requerido'
    }
    return '';
  }


  
}
