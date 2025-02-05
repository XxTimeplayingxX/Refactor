import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  seguridadService = inject(SeguridadService);
  router = inject(Router);

  ngOnInit(): void {
    this.seguridadService.otorgarRespuesta(false);
  }

  form = this.formBuilder.group({
    usuario: ['', Validators.required],
    contrasena: ['', Validators.required]
  });

  validarUsuario(){
    let usuario = this.form.controls.usuario.value;
    let constrasena = this.form.controls.contrasena.value;

    if(usuario == 'admin' && constrasena == 'admin'){
      this.seguridadService.otorgarRespuesta(true);
      console.log('Usuario Logueado', this.seguridadService.estaLogueado())
      this.router.navigate(['/']);
    }
    else{
      this.seguridadService.otorgarRespuesta(false)
    }

  }
}
