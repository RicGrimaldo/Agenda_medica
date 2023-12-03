import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PacienteComponent } from './paciente.component'
import { AgendaPacienteComponent } from './agenda-paciente/agenda-paciente.component'
import { FormularioCitaComponent } from './formulario-cita/formulario-cita.component'
import { HistorialClinicoComponent } from './historial-clinico/historial-clinico.component'

const routes: Routes = [
  { path: '', redirectTo: 'agenda', pathMatch: 'full' },
  {
    path: '',
    component: PacienteComponent,
    children: [
      { path: 'agenda/:idPaciente', component: AgendaPacienteComponent },
      { path: 'nueva-cita/:idPaciente', component: FormularioCitaComponent },
      { path: 'historial-clinico/:idPaciente', component: HistorialClinicoComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
