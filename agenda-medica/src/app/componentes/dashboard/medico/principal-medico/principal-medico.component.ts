import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { Dashboard, DashboardService } from 'src/app/servicios/dashboard.service'
import { CalendarOptions } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import { UsuariosService } from 'src/app/servicios/usuarios.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MedicoService } from 'src/app/servicios/medico.service'

@Component({
  selector: 'app-principal-medico',
  templateUrl: './principal-medico.component.html',
  styleUrls: ['./principal-medico.component.css']
})
export class PrincipalMedicoComponent {
  public dataDashboard$!: Observable<Dashboard>
  idMedico: any
  eventos: any = []
  arreglo: any = []
  constructor (
    private readonly dashboardService: DashboardService,
    private readonly usuariosService: UsuariosService,
    private readonly medicoService: MedicoService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'principal-medico'
    }
    this.dataDashboard$ = dashboardService.dashboardObservable
  }

  ngOnInit (): void {
    this.route.params.subscribe((params) => {
      if (params['idMedico'] != null) {
        this.idMedico = params['idMedico']
        this.medicoService.agendaMedico(this.idMedico).subscribe(
          (response) => {
            this.eventos = response
            for (let i = 0; i < this.eventos.length; i++) {
              const evento = {
                title: this.eventos[i].nombrePaciente,
                start: new Date(this.eventos[i].start),
                end: new Date(this.eventos[i].end)
              }
              this.arreglo.push(evento)
            }
            this.calendarOptions.events = this.arreglo
          }
        )
      }
    })
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    height: 500,
    locale: esLocale,
    themeSystem: 'standard',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    eventClick: this.handleEventClick.bind(this), // MUST ensure `this` context is maintained
    events: []
  }

  handleEventClick (eventInfo: any) {
    console.log('Evento clickeado:', eventInfo.event)
    // Agrega aquí la lógica que deseas ejecutar cuando se hace clic en un evento
  }
}
