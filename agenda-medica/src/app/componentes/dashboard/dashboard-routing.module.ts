/* eslint-disable @typescript-eslint/promise-function-async */
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard.component'
import { RoleGuard } from 'src/app/guards/role-guard'

const routes: Routes = [
  {

    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'paciente',
        loadChildren: () => import('./paciente/paciente.module').then(x => x.PacienteModule),
        canActivate: [RoleGuard],
        data: {
          requiredRoles: ['paciente']
        }
      },
      {
        path: 'administracion',
        loadChildren: () => import('./administrador/administrador.module').then(x => x.AdministradorModule),
        canActivate: [RoleGuard],
        data: {
          requiredRoles: ['admin']
        }
      },
      {
        path: 'recepcion',
        loadChildren: () => import('./recepcion/recepcion.module').then(x => x.RecepcionModule),
        canActivate: [RoleGuard],
        data: {
          requiredRoles: ['recepcion']
        }
      },
      {
        path: 'medico',
        loadChildren: () => import('./medico/medico.module').then(x => x.MedicoModule),
        canActivate: [RoleGuard],
        data: {
          requiredRoles: ['medico']
        }
      }

    ]

  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
