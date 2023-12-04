import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdministradorComponent } from './administrador.component'
import { AdmidoctorComponent } from './admidoctor/admidoctor.component'
import { AdmipacienteComponent } from './admipaciente/admipaciente.component'
import { BuscadorGeneralComponent } from './buscador-general/buscador-general.component'
import { AdminsecretariaComponent } from './adminsecretaria/adminsecretaria.component'
import { AdministradorRoutingModule } from './administrador-routing.module'
import { ScrollingModule } from '@angular/cdk/scrolling'
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
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { RoleGuard } from 'src/app/guards/role-guard'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@NgModule({
  declarations: [
    AdministradorComponent,
    AdmidoctorComponent,
    AdmipacienteComponent,
    BuscadorGeneralComponent,
    AdminsecretariaComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
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
    MatPaginatorModule,
    MatSlideToggleModule
  ],
  providers: [RoleGuard] // Agrega RoleGuard como proveedor
})
export class AdministradorModule { }
