import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaAPI } from '../../interface/general/api-responses.model';
import { Servicio } from '../../interface/automovil/registros-automovil/servicio.interface';
import { Aseguranza } from '../../interface/automovil/registros-automovil/aseguranza.interface';
import { Combustible } from '../../interface/automovil/registros-automovil/combustible.interface';

const path = 'http://localhost:3000/api/v1';

@Injectable({
  providedIn: 'root',
})
export class RecordsGeneralService {
  constructor(private http: HttpClient) {}

  getRecordsByAutomovil(
    record: string,
    placas: string,
  ): Observable<RespuestaAPI> {
    return this.http.get<RespuestaAPI>(`${path}/${record}/list/${placas}`);
  }

  newServicio(servicio: Servicio): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(`${path}/servicios/new`, servicio);
  }

  newAseguranza(aseguranza: Aseguranza): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(`${path}/aseguranzas/new`, aseguranza);
  }

  newCombustible(combustible: Combustible): Observable<RespuestaAPI> {
    return this.http.post<RespuestaAPI>(
      `${path}/combustibles/new`,
      combustible,
    );
  }
}
