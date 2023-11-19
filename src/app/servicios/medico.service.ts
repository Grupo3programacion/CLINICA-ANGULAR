import { Injectable } from '@angular/core';
import { ItemMedicoDTO } from '../modelo/item-medico-dto';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  private citaURL = 'http://localhost:8081/api/medicos';
  constructor(private http: HttpClient) {}

  public listarCitas(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.citaURL}/listarCitasPendientes`);
  }

  public listarCitasPendientes(codigoMedico: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.citaURL}/listarCitasPendientes/${codigoMedico}`
    );
  }

  public listarHistorialCitas(codigoMedico: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.citaURL}/listarHistorialCitas/${codigoMedico}`
    );
  }

  public verDetalleCitaAtendida(idCita: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.citaURL}/verDetalleCitaAtendida/${idCita}`
    );
  }
}
