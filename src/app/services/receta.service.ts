import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private http = inject(HttpClient);

  public addData(receta: any):Observable<any>{
    const url = `${enviroment.API_URL}/Receta`;
    return this.http.post<any>(url, receta);
  }

  
}
