import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RecepcionComponent } from './recepcion.component'
import { FormularioCitaComponent } from '../paciente/formulario-cita/formulario-cita.component'
import { AgendaRecepcionComponent } from './agenda-recepcion/agenda-recepcion.component'
import { CitasProgramadasComponent } from './citas-programadas/citas-programadas.component'

const routes: Routes = [
  { path: '', redirectTo: 'agenda-recepcion', pathMatch: 'full' },
  {
    path: '',
    component: RecepcionComponent,
    children: [
      { path: 'nueva-cita', component: FormularioCitaComponent },
      { path: 'agenda-recepcion', component: AgendaRecepcionComponent },
      { path: 'citas-programadas', component: CitasProgramadasComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepcionRoutingModule { }
