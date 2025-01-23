import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CitaMedicaService {

  private http = inject(HttpClient);

  public getData():Observable<any>{
    return this.http.get<any>(`${enviroment.API_URL}/CitaMedicaAll`)
  }
  public addData(citaMedicaData: any):Observable<any>{
    const url = `${enviroment.API_URL}/CitaMedica`;
    return this.http.post<any>(url, citaMedicaData);
  }
  public updateData(citaMedicaID: number, citamedicaData: any){
    const url = `${enviroment.API_URL}/CitaMedica/${citaMedicaID}`;
    return this.http.put<any>(url, citamedicaData);
  }
}
