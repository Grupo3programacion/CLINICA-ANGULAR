import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { RegistroPQRSDTO } from '../modelo/registro-pqrsdto';
import { DetallePacienteDTO } from '../modelo/detalle-paciente-dto';
import { RegistroCitaDTO } from '../modelo/registro-cita-dto';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private userUrl = 'http://localhost:8081/api/pacientes';
  constructor(private http: HttpClient) {}

  public verDetallePaciente(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userUrl}/detalle/${codigo}`);
  }

  public verDetalleCita(codigo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.userUrl}/verDetalleCita/${codigo}`
    );
  }



  public eliminarCuenta(codigo: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userUrl}/eliminar/${codigo}`);
  }

  public editarPerfil(pacienteDTO: DetallePacienteDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(
      `${this.userUrl}/editarPerfil`,
      pacienteDTO
    );
  }

  public crearPQRS(registroPQRSDTO: RegistroPQRSDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(
      `${this.userUrl}/crear-pqrs`,
      registroPQRSDTO
    );
  }
  public listarPQRSPaciente(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.userUrl}/listar-pqrs/${codigoPaciente}`
    );
  }
  public listarCitasPaciente(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.userUrl}/listarCitasPaciente/${codigoPaciente}`
    );
  }

  public crearCita(registroCitaDTO: RegistroCitaDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(
      `${this.userUrl}/agendarCita`,
      registroCitaDTO
    );
  }

  public listarMedicosPorEspecialidad(
    especialidades: string
  ): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.userUrl}/listarMedicosEspecialidad/${especialidades}`
    );
  }

  /*public listarHistorialCitasPaciente(
    codigoPaciente: number
  ): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.userUrl}/listarCitasPaciente/${codigoPaciente}`
    );
  }*/
  public listarCitasPqrs(codigoPaciente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(
      `${this.userUrl}/listarCitasPqrs/${codigoPaciente}`
    );
  }

  

}
