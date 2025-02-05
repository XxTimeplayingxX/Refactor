import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor() { }

  respuesta: boolean = false;
  otorgarRespuesta(respuesta: boolean){
    this.respuesta = respuesta;
    sessionStorage.setItem('logueado', JSON.stringify(respuesta));
  }

  estaLogueado():boolean{
    return JSON.parse(sessionStorage.getItem('logueado')|| 'false')
  }

  obtenerRol():string{
    return 'admin';
  }
}
