import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RecepcionRoutingModule } from './recepcion-routing.module'
import { RecepcionComponent } from './recepcion.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { AgendaRecepcionComponent } from './agenda-recepcion/agenda-recepcion.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatStepperModule } from '@angular/material/stepper'
import { MatTooltipModule } from '@angular/material/tooltip'
import { FullCalendarModule } from '@fullcalendar/angular'
import { ScrollingModule } from '@angular/cdk/scrolling'
import { CitasProgramadasComponent } from './citas-programadas/citas-programadas.component'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { RoleGuard } from 'src/app/guards/role-guard'

@NgModule({
  declarations: [
    RecepcionComponent,
    AgendaRecepcionComponent,
    CitasProgramadasComponent
  ],
  imports: [
    CommonModule,
    RecepcionRoutingModule,
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
export class RecepcionModule { }
