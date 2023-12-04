import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AdministradorComponent } from './administrador.component'
import { BuscadorGeneralComponent } from './buscador-general/buscador-general.component'
import { AdmidoctorComponent } from './admidoctor/admidoctor.component'
import { AdminsecretariaComponent } from './adminsecretaria/adminsecretaria.component'
import { AdmipacienteComponent } from './admipaciente/admipaciente.component'

const routes: Routes = [
  { path: '', redirectTo: 'buscador-general', pathMatch: 'full' },
  {
    path: '',
    component: AdministradorComponent,
    children: [
      { path: 'buscador-general', component: BuscadorGeneralComponent },
      { path: 'medico', component: AdmidoctorComponent },
      { path: 'recepcion', component: AdminsecretariaComponent },
      { path: 'paciente', component: AdmipacienteComponent },
      { path: 'editar-medico/:idMedico', component: AdmidoctorComponent },
      { path: 'editar-recepcionista/:idRecepcionista', component: AdminsecretariaComponent },
      { path: 'editar-paciente/:idPaciente', component: AdmipacienteComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule {}
