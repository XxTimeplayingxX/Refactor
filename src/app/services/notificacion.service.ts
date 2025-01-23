import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private http = inject(HttpClient);

  public addData(notificacion: any): Observable<any>{
    const url = `${enviroment.API_URL}/notificacion`;
    return this.http.post<any>(url, notificacion);
  }
}
