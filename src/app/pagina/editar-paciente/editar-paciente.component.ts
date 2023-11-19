import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Alerta } from 'src/app/modelo/alerta';
import { RegistroPacienteDTO } from 'src/app/modelo/registro-paciente-dto';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent {
  ciudades: string[];
  tipoSangres: string[];
  tipoAlergia!: string[];
  tipoEps: string[];
  archivos!: FileList;
  alerta!: Alerta;

  registroPacienteDTO: RegistroPacienteDTO;
  constructor(
    private authService: AuthService,
    private clinicaService: ClinicaService,
    private imagenService: ImagenService,
    private tokenService: TokenService,
    private pacienteService: PacienteService
  ) {
    this.registroPacienteDTO = new RegistroPacienteDTO();

    const objeto = this;
    let codigo = this.tokenService.getCodigo();

  
    this.pacienteService.verDetallePaciente(codigo).subscribe({
      next: (data) => {
        this.registroPacienteDTO = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });




    //this.registroPacienteDTO.nombrePaciente = 
    this.ciudades = [];
    this.tipoSangres = [];
    this.tipoEps = [];
    this.cargarCiudades();
    this.cargarTipoSangre();
    this.cargarEPS();
    this.cargarTipoAlergia();
    this.cargarDatosPaciente();
  }

  public registrar() {
    if (this.registroPacienteDTO.fotoPaciente.length != 0) {
      this.authService.registrar(this.registroPacienteDTO).subscribe({
        next: (data) => {
          this.alerta = { mensaje: data.respuesta, tipo: 'success' };
        },
        error: (error) => {
          this.alerta = { mensaje: error.error.respuesta, tipo: 'danger' };
        },
      });
    } else {
      this.alerta = { mensaje: 'Debe subir una imagen', tipo: 'danger' };
    }
  }


  public actualizar() {
    if (this.registroPacienteDTO.fotoPaciente.length != 0) {
      this.pacienteService.editarPerfil(this.registroPacienteDTO).subscribe({
        next: (data) => {
          this.alerta = { mensaje: data.respuesta, tipo: 'success' };
        },
        error: (error) => {
          this.alerta = { mensaje: error.error.respuesta, tipo: 'danger' };
        },
      });
    } else {
      this.alerta = { mensaje: 'Debe subir una imagen', tipo: 'danger' };
    }
  }

  public sonIguales(): boolean {
    return (
      this.registroPacienteDTO.contrasenia ==
      this.registroPacienteDTO.confirmarContrasenia
    );
  }

  private cargarCiudades() {
    this.clinicaService.listarCiudades().subscribe({
      next: (data) => {
        this.ciudades = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private cargarTipoSangre() {
    this.clinicaService.listarTipoSangre().subscribe({
      next: (data) => {
        this.tipoSangres = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private cargarEPS() {
    this.clinicaService.listarEPS().subscribe({
      next: (data) => {
        this.tipoEps = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private cargarTipoAlergia() {
    this.clinicaService.listarTipoAlergia().subscribe({
      next: (data) => {
        this.tipoAlergia = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private cargarDatosPaciente() {

  }



  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.registroPacienteDTO.fotoPaciente = event.target.files[0].name;
      this.archivos = event.target.files;
    }
  }

  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('imagen', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: (data) => {
          this.registroPacienteDTO.fotoPaciente = data.respuesta.url;
        },
        error: (error) => {
          this.alerta = { mensaje: error.error, tipo: 'danger' };
        },
      });
    } else {
      this.alerta = {
        mensaje: 'Debe seleccionar una imagen y subirla',
        tipo: 'danger',
      };
    }
  }
}
