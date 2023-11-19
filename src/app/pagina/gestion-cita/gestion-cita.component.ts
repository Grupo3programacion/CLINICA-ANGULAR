import { ChangeDetectorRef, Component } from '@angular/core';
import { Alerta } from 'src/app/modelo/alerta';
import { CitasPacienteDTO } from 'src/app/modelo/citas-paciente-dto';
import { ItemCitaDTO } from 'src/app/modelo/item-cita-dto';
import { CitaService } from 'src/app/servicios/cita.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { TokenService } from 'src/app/servicios/token.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gestion-cita',
  templateUrl: './gestion-cita.component.html',
  styleUrls: ['./gestion-cita.component.css'],
})
export class GestionCitaComponent {
  citas: CitasPacienteDTO[];
  filtro: CitasPacienteDTO[];
  buscarMedico: String;

  constructor(
    private pacienteService: PacienteService,
    private tokenService: TokenService,
    private router: Router,
    private route : ActivatedRoute,
    private cdr: ChangeDetectorRef // Añade ChangeDetectorRef como dependencia
  ) {
    this.citas = [];
    this.filtro = [];
    this.obtenerCita();
    this.buscarMedico ="";
    this.router = router;
    
    this.route.params.subscribe(params =>{
      this.buscarMedico = params['texto'];
      this.filtro = this.citas.filter(p =>
        p.nombreMedico.toLowerCase().includes(this.buscarMedico.toLowerCase()));
    })
    
  }

  public obtenerCita() {
    let codigo = this.tokenService.getCodigo();
    this.pacienteService.listarCitasPaciente(codigo).subscribe({
      next: (data) => {
        this.citas = data.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public buscarCitas(valor:string) {
    if(valor){this.router.navigate(["/gestion-cita", valor]);}
  }

  /*public buscarCitas() {
    let codigo = this.tokenService.getCodigo();
    this.pacienteService.listarCitasPaciente(codigo).subscribe({
      next: (data) => {
        console.log('Buscar Medico:', this.buscarMedico);
        // Filtrar citas por nombre del médico
        this.citas = data.respuesta.filter((cita: CitasPacienteDTO) =>
          cita.nombreMedico
            .toLowerCase()
            .includes(this.buscarMedico.toLowerCase())
        );
        // Desencadenar manualmente la detección de cambios
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }*/
}
