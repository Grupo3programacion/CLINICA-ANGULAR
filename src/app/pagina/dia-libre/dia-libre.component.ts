import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { DiaLibreDTO } from 'src/app/modelo/dia-libre-dto';
import { DiaLibreService } from 'src/app/servicios/dia-libre.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-dia-libre',
  templateUrl: './dia-libre.component.html',
  styleUrls: ['./dia-libre.component.css'],
})
export class DiaLibreComponent {
  alerta!: Alerta;

  diaLibreDTO: DiaLibreDTO;
  constructor(
    private diaLibreService: DiaLibreService,
    private tokenService: TokenService
  ) {
    this.diaLibreDTO = new DiaLibreDTO();
  }
  public gestionarDiaLibre() {
    const objeto = this;
    let codigo = this.tokenService.getCodigo();

    this.diaLibreDTO.idMedico = codigo;

    this.diaLibreService.gestionarDiaLibre(this.diaLibreDTO).subscribe({
      next: (data) => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success' };
      },
      error: (error) => {
        this.alerta = { mensaje: error.error.respuesta, tipo: 'danger' };
      },
    });
  }
}
