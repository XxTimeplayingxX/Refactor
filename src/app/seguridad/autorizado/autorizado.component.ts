import { Component, inject } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-autorizado',
  imports: [],
  templateUrl: './autorizado.component.html',
  styleUrl: './autorizado.component.css'
})
export class AutorizadoComponent {
  seguridadService = inject(SeguridadService);

  estaAutorizado(): boolean{
    return this.seguridadService.estaLogueado();
  }
  
}
