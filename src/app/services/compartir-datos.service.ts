import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonaDTO } from '../clinica/listado/Paciente';

@Injectable({
  providedIn: 'root'
})
export class CompartirDatosService {
  private dataSpurce = new BehaviorSubject<any>('');
  data$ = this.dataSpurce.asObservable();

  enviarDatos(datos:any){
    this.dataSpurce.next(datos);
  }

  constructor() { }
}
