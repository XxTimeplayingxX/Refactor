import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private http = inject(HttpClient);

  public getData():Observable<any>{
    return this.http.get<any>(`${enviroment.API_URL}/paciente`)
  }

  public updateData(pacienteID: number, pacienteData: any): Observable<any>{
    const url = `${enviroment.API_URL}/paciente/${pacienteID}`;
    return this.http.put<any>(url, pacienteData);
  }
  public addData(pacienteData: any){
    const url=`${enviroment.API_URL}/paciente`
    return this.http.post<any>(url, pacienteData);
  }
  public deleteData(pacienteID: number){
    const url = `${enviroment.API_URL}/paciente/Delete/${pacienteID}`
    return this.http.delete<any>(url);
  }
}
