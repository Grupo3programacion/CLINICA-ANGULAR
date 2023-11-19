import { Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { CitaPacienteDTO } from 'src/app/modelo/cita-paciente-dto';
import { RegistroPQRSDTO } from 'src/app/modelo/registro-pqrsdto';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { PqrsService } from 'src/app/servicios/pqrs.service';
import { TokenService } from 'src/app/servicios/token.service';
@Component({
  selector: 'app-crear-pqrs',
  templateUrl: './crear-pqrs.component.html',
  styleUrls: ['./crear-pqrs.component.css'],
})
export class CrearPqrsComponent {
  
  citaPacienteDTO: RegistroPQRSDTO[];
  tiposPqrs: string[];
  tiposCitasPqrs: string[];
  alerta!: Alerta;

  registroPQRSDTO: RegistroPQRSDTO;

  constructor(
    private pqrsService: PqrsService,
    private clinicaService: ClinicaService,
    private pacienteService:PacienteService,
    private tokenService: TokenService) 
    {
    this.registroPQRSDTO = new RegistroPQRSDTO();
    this.cargarTiposPQRS();
    this.cargarCitasPqrs();
    this.tiposPqrs = [];
    this.citaPacienteDTO = [];
    this.tiposCitasPqrs = [];
  }
  public crearPqrs() {
   
    this.pqrsService.crear(this.registroPQRSDTO).subscribe({
      next: (data) => {
        this.alerta = { mensaje: data.respuesta, tipo: 'success' };
      },
      error: (error) => {
        this.alerta = { mensaje: error.error.respuesta, tipo: 'danger' };
      },
    });
    
  }
  public seleccionar(idCita: number) {
    this.registroPQRSDTO.idCita = idCita;
  }

  private cargarTiposPQRS() {
    this.clinicaService.listarTiposPqrs().subscribe({
      next: (data) => {
        this.tiposPqrs = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


  private cargarCitasPqrs() {
    let codigo = this.tokenService.getCodigo();

    this.registroPQRSDTO.codigoPaciente = codigo;
    this.pacienteService.listarCitasPqrs(codigo).subscribe({
      next: (data) => {
        this.citaPacienteDTO = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


}
