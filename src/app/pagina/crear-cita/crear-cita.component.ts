import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Alerta } from 'src/app/modelo/alerta';
import { MedicoCrearCitaDTO } from 'src/app/modelo/medico-crear-cita-dto';
import { RegistroCitaDTO } from 'src/app/modelo/registro-cita-dto';
import { RegistroPacienteDTO } from 'src/app/modelo/registro-paciente-dto';
import { CitaService } from 'src/app/servicios/cita.service';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css'],
})
export class CrearCitaComponent {
  especialidades: string[];
  listaMedicos: MedicoCrearCitaDTO[];
  registroCitaDTO: RegistroCitaDTO;

  alerta!: Alerta;

  constructor(
    private authService: AuthService,
    private pacienteService: PacienteService,
    private tokenService: TokenService,
    private clinicaService: ClinicaService
  ) {
    this.registroCitaDTO = new RegistroCitaDTO();
    this.especialidades = [];
    this.listaMedicos = [];
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
    let codigo = this.tokenService.getCodigo();

    this.registroCitaDTO.codigoPaciente = codigo;

    this.pacienteService.crearCita(this.registroCitaDTO).subscribe({
      next: (data) => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success' };
      },
      error: (error) => {
        this.alerta = { mensaje: error.error.respuesta, tipo: 'danger' };
      },
    });
  }

  public buscarMedicos(event: any) {
    const esp = event.target.value;

    this.pacienteService.listarMedicosPorEspecialidad(esp).subscribe({
      next: (data) => {
        this.listaMedicos = data.respuesta;
      },
      error: (error) => {
        this.listaMedicos = [];
        this.alerta = { mensaje: error.error.respuesta, tipo: 'danger' };
      },
    });
  }
}
