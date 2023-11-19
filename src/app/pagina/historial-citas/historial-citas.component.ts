import { Component } from '@angular/core';
import { ItemMedicoDTO } from 'src/app/modelo/item-medico-dto';
import { MedicoService } from 'src/app/servicios/medico.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-historial-citas',
  templateUrl: './historial-citas.component.html',
  styleUrls: ['./historial-citas.component.css']
})
export class HistorialCitasComponent {
  medico: ItemMedicoDTO[];
  constructor(
    private medicoService: MedicoService,
    private tokenService: TokenService
  ) {
    this.medico = [];
    this.obtenerCita();
  }

  public obtenerCita() {
    let codigo = this.tokenService.getCodigo();
    this.medicoService.listarHistorialCitas(codigo).subscribe({
      next: (data) => {
        this.medico = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


}
