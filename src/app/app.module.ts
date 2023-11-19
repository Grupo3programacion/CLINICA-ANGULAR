import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { GestionPqrsComponent } from './pagina/gestion-pqrs/gestion-pqrs.component';
import { CrearPqrsComponent } from './pagina/crear-pqrs/crear-pqrs.component';
import { DetallePqrsComponent } from './pagina/detalle-pqrs/detalle-pqrs.component';
import { DetalleCitaComponent } from './pagina/detalle-cita/detalle-cita.component';
import { GestionCitaComponent } from './pagina/gestion-cita/gestion-cita.component';
import { CrearCitaComponent } from './pagina/crear-cita/crear-cita.component';
import { AlertaComponent } from './pagina/alerta/alerta.component';
import { GestionMedicosComponent } from './pagina/gestion-medicos/gestion-medicos.component';
import { AtenderCitaComponent } from './pagina/atender-cita/atender-cita.component';
import { UsuarioInterceptor } from './interceptor/usuario.interceptor';
import { DiaLibreComponent } from './pagina/dia-libre/dia-libre.component';
import { HistorialCitasComponent } from './pagina/historial-citas/historial-citas.component';
import { EditarPacienteComponent } from './pagina/editar-paciente/editar-paciente.component';
import { DetalleCitaMedicoComponent } from './pagina/detalle-cita-medico/detalle-cita-medico.component';
import { HistorialCitasPacienteComponent } from './pagina/historial-citas-paciente/historial-citas-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    GestionPqrsComponent,
    CrearPqrsComponent,
    DetallePqrsComponent,
    DetalleCitaComponent,
    GestionCitaComponent,
    CrearCitaComponent,
    AlertaComponent,
    GestionMedicosComponent,
    AtenderCitaComponent,
    DiaLibreComponent,
    HistorialCitasComponent,
    EditarPacienteComponent,
    DetalleCitaMedicoComponent,
    HistorialCitasPacienteComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UsuarioInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
