import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./shared/menu/menu.component";
import { AutorizadoComponent } from "./seguridad/autorizado/autorizado.component";
import { NgClass } from '@angular/common';
import { SeguridadService } from './seguridad/seguridad.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent, AutorizadoComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  seguridadService = inject(SeguridadService); 
  
    estaAutorizado(): boolean{
      return this.seguridadService.estaLogueado();
    }
  title = 'Clínica';
}
