import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DetalleRecetaService {

  private http = inject(HttpClient);

  public addData(detalleReceta: any): Observable<any>{
    const url = `${enviroment.API_URL}/DetalleReceta`;
    return this.http.post<any>(url, detalleReceta);
  }
}
