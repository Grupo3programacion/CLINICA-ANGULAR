import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { DiaLibreDTO } from '../modelo/dia-libre-dto';

@Injectable({
  providedIn: 'root',
})
export class DiaLibreService {
  private userUrl = 'http://localhost:8081/api/medicos';
  constructor(private http: HttpClient) {}

  public gestionarDiaLibre(diaLibreDTO: DiaLibreDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(
      `${this.userUrl}/agendarDiaLibre`,
      diaLibreDTO
    );
  }



  
}
