import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { DashboardComponent } from './dashboard.component'
import { PacienteComponent } from './paciente/paciente.component'
import { FullCalendarModule } from '@fullcalendar/angular'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatGridListModule } from '@angular/material/grid-list'
import { RoleGuard } from 'src/app/guards/role-guard'

@NgModule({
  declarations: [
    DashboardComponent,
    PacienteComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FullCalendarModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule
  ],
  providers: [RoleGuard] // Agrega RoleGuard como proveedor
})
export class DashboardModule { }
