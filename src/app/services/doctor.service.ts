import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private http = inject(HttpClient);

  public getData(): Observable<any>{
    return this.http.get<any>(`${enviroment.API_URL}/doctor`)
  }
}
