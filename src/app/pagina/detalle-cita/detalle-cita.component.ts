import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Alerta } from 'src/app/modelo/alerta';
import { RegistroCitaDTO } from 'src/app/modelo/registro-cita-dto';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent {
  especialidades: string[];
  registroCitaDTO: RegistroCitaDTO;
  alerta!: Alerta;
  codigoCita!: number;

  constructor(
    private authService: AuthService,
    private pacienteService: PacienteService,
    private tokenService: TokenService,
    private route:ActivatedRoute,
    private clinicaService: ClinicaService

  ) {
    this.registroCitaDTO = new RegistroCitaDTO();
   

   
    let codigo = this.tokenService.getCodigo();
    this.route.params.subscribe( params =>{

    
      this.codigoCita = params['idCita'];
  
    this.pacienteService.verDetalleCita(this.codigoCita).subscribe({
      next: (data) => {
        this.registroCitaDTO = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },

    })});



    this.especialidades = [];
    this.cargarEspecialidades();
  }

  private cargarEspecialidades() {
    this.clinicaService.listarEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public crearCita() {
  
      this.pacienteService.crearCita(this.registroCitaDTO).subscribe({
        next: (data) => {
          this.alerta = { mensaje: data.respuesta, tipo: 'success' };
        },
        error: (error) => {
          this.alerta = { mensaje: error.error.respuesta, tipo: 'danger' };
        },
      });
  }
}
