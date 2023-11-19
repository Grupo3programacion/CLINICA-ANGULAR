import { Component } from '@angular/core';
import { ItemPQRSDTO } from 'src/app/modelo/item-pqrsdto';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';
import { TokenService } from 'src/app/servicios/token.service';
@Component({
  selector: 'app-gestion-pqrs',
  templateUrl: './gestion-pqrs.component.html',
  styleUrls: ['./gestion-pqrs.component.css'],
})
export class GestionPqrsComponent {
  pqrs: ItemPQRSDTO[];
  constructor(
    private pacienteService: PacienteService,
    private tokenService: TokenService,
    private pqrsService: PqrsService
  ) {
    this.pqrs = [];
    this.obtenerPqrs();
  }
  public obtenerPqrs() {
    let codigo = this.tokenService.getCodigo();
    this.pqrsService.listarPQRSPaciente(codigo).subscribe({
      next: (data) => {
        this.pqrs = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  
}
