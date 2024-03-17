import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaAPI } from 'src/interface/general/api-responses.model';
import { Observable } from 'rxjs';

const path = 'http://localhost:3000/api/v1/automoviles';

@Injectable({
  providedIn: 'root',
})
export class AutomovilGeneralService {
  constructor(private http: HttpClient) {}

  getAutomoviles(): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${path}/list`);
  }

  getAutomovil(placas: string): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${path}/${placas}/details`);
  }

  newAutomovil(automovil: any): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(`${path}/new`, automovil);
  }

  editAutomovil(placas: string, automovil: any): Observable<RespuestaAPI> {
    return this.http.put<RespuestaAPI>(`${path}/${placas}/edit`, automovil);
  }

  removeAutomovil(placas: string): Observable<RespuestaAPI> {
    return this.http.delete<RespuestaAPI>(`${path}/${placas}/remove`);
  }
}
