import { Injectable } from '@angular/core';
import { ItemCitaDTO } from '../modelo/item-cita-dto';
import { RegistroCitaDTO } from '../modelo/registro-cita-dto';
import { HttpClient } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { RegistroPQRSDTO } from '../modelo/registro-pqrsdto';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  private clinicaURL = 'http://localhost:8081/api/PQRS';
  constructor(private http: HttpClient) {}

  public listarPqrs(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clinicaURL}/listarPQRSPaciente`);
  }

  public listarPQRSPaciente(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.clinicaURL}/listarPQRSPaciente/${codigoPaciente}`
    );
  }

  public crear(cita: RegistroCitaDTO){
    /*let codigo = this.pqrs.length + 1;
    this.pqrs.push({ codigo: codigo, estado: 'ACTIVO', motivo: pqrs.motivo, fecha: new
    Date().toISOString() });*/
    }
}
