import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MedicoComponent } from './medico.component'
import { PrincipalMedicoComponent } from './principal-medico/principal-medico.component'
import { ListadepacientesComponent } from './listadepacientes/listadepacientes.component'
import { CrearAgendaComponent } from './crear-agenda/crear-agenda.component'
import { AtenderpacientedatosComponent } from './atenderpacientedatos/atenderpacientedatos.component'
import { AtenderpacienteDiagnosticoComponent } from './atenderpaciente-diagnostico/atenderpaciente-diagnostico.component'
import { HistorialClinicoComponent } from '../paciente/historial-clinico/historial-clinico.component'

const routes: Routes = [
  { path: '', redirectTo: 'principal-medico', pathMatch: 'full' },
  {
    path: '',
    component: MedicoComponent,
    children: [
      { path: 'principal-medico/:idMedico', component: PrincipalMedicoComponent },
      { path: 'lista-pacientes/:idMedico', component: ListadepacientesComponent },
      { path: 'crear-agenda/:idMedico', component: CrearAgendaComponent },
      { path: 'paciente-datos/:idPaciente/:idCita', component: AtenderpacientedatosComponent },
      { path: 'paciente-diagnostico/:idPaciente/:idCita', component: AtenderpacienteDiagnosticoComponent },
      { path: 'historial-clinico/:idPaciente', component: HistorialClinicoComponent }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoRoutingModule { }
