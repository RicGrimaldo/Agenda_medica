import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PacienteRoutingModule } from './paciente-routing.module'
import { AgendaPacienteComponent } from './agenda-paciente/agenda-paciente.component'
import { FullCalendarModule } from '@fullcalendar/angular'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatGridListModule } from '@angular/material/grid-list'
import { FormularioCitaComponent } from './formulario-cita/formulario-cita.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatStepperModule } from '@angular/material/stepper'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { HistorialClinicoComponent } from './historial-clinico/historial-clinico.component'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { RoleGuard } from 'src/app/guards/role-guard'

@NgModule({
  declarations: [
    AgendaPacienteComponent,
    FormularioCitaComponent,
    HistorialClinicoComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    FullCalendarModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatStepperModule,
    MatAutocompleteModule,
    ScrollingModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [RoleGuard] // Agrega RoleGuard como proveedor
})
export class PacienteModule { }
