import { Injectable } from '@angular/core';
import { ItemPQRSDTO } from '../modelo/item-pqrsdto';
import { RegistroPQRSDTO } from '../modelo/registro-pqrsdto';
import { DetallePQRSDTO } from '../modelo/detalle-pqrsdto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {
 
    /*pqrs: ItemPQRSDTO[];

    
    constructor() {
    this.pqrs = [];
    this.pqrs.push({ codigo: 1, estado: 'ACTIVO', motivo: 'Solicitud de información', fecha:
    '2023-10-12' });
    this.pqrs.push({ codigo: 2, estado: 'ACTIVO', motivo: 'Solicitud de cambio de fecha',
    fecha: '2023-09-29' });
    this.pqrs.push({ codigo: 3, estado: 'CERRADO', motivo: 'Solicitud de información', fecha:
    '2023-11-01' });
    this.pqrs.push({ codigo: 4, estado: 'ACTIVO', motivo: 'Queja sobre médico', fecha:
    '2023-09-07' });
    }*/


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

    /*public listar(): ItemPQRSDTO[] {
    return this.pqrs;
    }
    public obtener(codigo: number): ItemPQRSDTO | undefined{
    return this.pqrs.find(pqrs => pqrs.codigo == codigo);
    }*/
   public crear(pqrs: RegistroPQRSDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(
      `${this.clinicaURL}/crearPQR`,
      pqrs
    );
    }

   

    public verDetallePQRS(codigo: number): Observable<MensajeDTO> {
      return this.http.get<MensajeDTO>(
        `${this.clinicaURL}/verDetallePQRS/${codigo}`
      );
    }



}
