import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MedicoRoutingModule } from './medico-routing.module'
import { MedicoComponent } from './medico.component'
import { PrincipalMedicoComponent } from './principal-medico/principal-medico.component'
import { CrearAgendaComponent } from './crear-agenda/crear-agenda.component'
import { ListadepacientesComponent } from './listadepacientes/listadepacientes.component'
import { AtenderpacientedatosComponent } from './atenderpacientedatos/atenderpacientedatos.component'
import { AtenderpacienteDiagnosticoComponent } from './atenderpaciente-diagnostico/atenderpaciente-diagnostico.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatStepperModule } from '@angular/material/stepper'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FullCalendarModule } from '@fullcalendar/angular'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { RoleGuard } from 'src/app/guards/role-guard'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'

@NgModule({
  declarations: [
    MedicoComponent,
    PrincipalMedicoComponent,
    CrearAgendaComponent,
    ListadepacientesComponent,
    AtenderpacientedatosComponent,
    AtenderpacienteDiagnosticoComponent
  ],
  imports: [
    CommonModule,
    MedicoRoutingModule,
    MatToolbarModule,
    MatIconModule,
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
    MatPaginatorModule,
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
export class MedicoModule {}
