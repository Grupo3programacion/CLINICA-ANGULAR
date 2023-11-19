import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { GestionPqrsComponent } from './pagina/gestion-pqrs/gestion-pqrs.component';
import { GestionCitaComponent } from './pagina/gestion-cita/gestion-cita.component';
import { CrearPqrsComponent } from './pagina/crear-pqrs/crear-pqrs.component';
import { DetallePqrsComponent } from './pagina/detalle-pqrs/detalle-pqrs.component';
import { CrearCitaComponent } from './pagina/crear-cita/crear-cita.component';
import { GestionMedicosComponent } from './pagina/gestion-medicos/gestion-medicos.component';
import { AtenderCitaComponent } from './pagina/atender-cita/atender-cita.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';
import { DiaLibreComponent } from './pagina/dia-libre/dia-libre.component';
import { HistorialCitasComponent } from './pagina/historial-citas/historial-citas.component';
import { EditarPacienteComponent } from './pagina/editar-paciente/editar-paciente.component';
import { DetalleCitaComponent } from './pagina/detalle-cita/detalle-cita.component';
import { DetalleCitaMedicoComponent } from './pagina/detalle-cita-medico/detalle-cita-medico.component';
import { HistorialCitasPacienteComponent } from './pagina/historial-citas-paciente/historial-citas-paciente.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  //{ path: 'gestion-cita', component: GestionCitaComponent },
  { path: 'crear-cita', component: CrearCitaComponent },
  //{ path: 'gestion-medicos', component: GestionMedicosComponent },
  //{ path: 'atender-cita/:idMedico', component: AtenderCitaComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  {
    path: 'gestion-pqrs',
    component: GestionPqrsComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['Paciente'],
    },
  },
  {
    path: 'crear-pqrs',
    component: CrearPqrsComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['Paciente'],
    },
  },
  {
    path: 'detalle-pqrs/:codigo',
    component: DetallePqrsComponent,
    canActivate: [RolesGuard],
    data: { expectedRole: ['Paciente', 'admin'] },
  },
  {
    path: 'gestion-medicos',
    component: GestionMedicosComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['Medico'],
    },
  },

  {
    path: 'atender-cita/:idMedico',
    component: AtenderCitaComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['Medico'],
    },
  },


  {
    path: 'detalle-cita-medico/:idCita',
    component: DetalleCitaMedicoComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['Medico'],
    },
  },

  {
    path: 'historial-citas',
    component: HistorialCitasComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['Medico'],
    },
  },

  {
    path: 'dia-libre',
    component: DiaLibreComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['Medico'],
    },
  },

  {
    path: 'editar-paciente',
    component: EditarPacienteComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['Paciente'],
    },
  },


  {
    path: 'detalle-cita/:idCita',
    component: DetalleCitaComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['Paciente'],
    },
  },

  {
    path: 'historial-citas-paciente',
    component: HistorialCitasPacienteComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['Paciente'],
    },
  },

  {
    path: 'gestion-cita',
    component: GestionCitaComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['Paciente'],
    },
  },

  /*{
    path: 'crear-medico',
    component: CrearMedicoComponent,
    canActivate: [RolesGuard],
    data: {
      expectedRole: ['admin'],
    },
  },*/

  { path: '**', pathMatch: 'full', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
