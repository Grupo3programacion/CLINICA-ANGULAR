import { Component } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Alerta } from 'src/app/modelo/alerta';
import { RegistroPacienteDTO } from 'src/app/modelo/registro-paciente-dto';
import { ClinicaService } from 'src/app/servicios/clinica.service';
import { ImagenService } from 'src/app/servicios/imagen.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
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
    private imagenService: ImagenService
  ) {
    this.registroPacienteDTO = new RegistroPacienteDTO();

    this.ciudades = [];
    this.tipoSangres = [];
    this.tipoEps = [];
    this.cargarCiudades();
    this.cargarTipoSangre();
    this.cargarEPS();
    this.cargarTipoAlergia();
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
