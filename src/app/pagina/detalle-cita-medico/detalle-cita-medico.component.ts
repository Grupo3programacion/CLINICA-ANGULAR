import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Alerta } from 'src/app/modelo/alerta';
import { DetalleCitaMedicoDTO } from 'src/app/modelo/detalle-cita-medico-dto';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { MedicoService } from 'src/app/servicios/medico.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-detalle-cita-medico',
  templateUrl: './detalle-cita-medico.component.html',
  styleUrls: ['./detalle-cita-medico.component.css']
})
export class DetalleCitaMedicoComponent {
  
  alerta!: Alerta;
  codigoCita!: number;

  detalleCitaMedicoDTO: DetalleCitaMedicoDTO;
  constructor(
    private authService: AuthService,
    private clinicaService: ClinicaService,
    private route:ActivatedRoute,
    private tokenService: TokenService,
    private medicoService: MedicoService
  ) {
    this.detalleCitaMedicoDTO = new DetalleCitaMedicoDTO();

 


    let codigo = this.tokenService.getCodigo();
    this.route.params.subscribe( params =>{

    
      this.codigoCita = params['idCita'];
  
      this.medicoService.verDetalleCitaAtendida(this.codigoCita).subscribe({
        next: (data) => {
          this.detalleCitaMedicoDTO = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },

    })});

}
}
