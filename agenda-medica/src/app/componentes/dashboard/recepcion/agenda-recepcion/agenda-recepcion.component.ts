import { Component } from '@angular/core'
import { CalendarOptions } from '@fullcalendar/core'
import { Observable, map, startWith } from 'rxjs'
import {
  DashboardService
} from 'src/app/servicios/dashboard.service'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { MedicoService } from 'src/app/servicios/medico.service'
@Component({
  selector: 'app-agenda-recepcion',
  templateUrl: './agenda-recepcion.component.html',
  styleUrls: ['./agenda-recepcion.component.css']
})
export class AgendaRecepcionComponent {
  form: FormGroup
  /* Valores inicializados */
  filteredMedicos!: Observable<any>
  optionsMedicos: any = []
  nombreMedico: any
  idMedico: any
  eventos: any = []
  arreglo: any = []

  constructor (dashboardService: DashboardService,
    private readonly fb: FormBuilder,
    private readonly medicoService: MedicoService) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'agenda-recepcion'
    }
    this.form = this.fb.group({
      medico: new FormControl(this.nombreMedico, Validators.required)
    })
  }

  // Configuración del calendario
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    height: 440,
    locale: esLocale,
    themeSystem: 'standard',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'dayGridMonth',
    events: []
  }

  ngOnInit (): void {
    // Autocompletado del campo médico

    this.medicoService.obtenerMedicos().subscribe(
      (response) => {
        this.optionsMedicos = response.map((item: any) => item)
        this.filteredMedicos = this._setupFilterObservable(
          this.form.controls['medico'],
          this.optionsMedicos,
          'nombreMedico')
      }
    )
  }

  /* Funciones para el autocompletado del campo médico */
  private _setupFilterObservable (
    control: AbstractControl,
    options: any,
    property: string
  ): Observable<any> {
    return control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(options, value, property))
    )
  }

  private _filter (options: any, value: string, property: string): any {
    const filterValue = String(value).toLowerCase()
    return options.filter((option: any) =>
      option[property].toLowerCase().includes(filterValue)
    )
  }

  /* Cuando se cambia un médico se busca su agenda para mostrarlo en el calendario */
  onSelectionChange (event: any): void {
    console.log('funcion onSelectionChange')
    this.eventos = []
    this.arreglo = []

    this.idMedico = event.option.value.idMedico
    this.medicoService.agendaMedico(this.idMedico).subscribe(
      (response) => {
        this.eventos = response
        for (let i = 0; i < this.eventos.length; i++) {
          const evento = {
            title: this.eventos[i].nombrePaciente,
            start: new Date(this.eventos[i].start),
            end: new Date(this.eventos[i].end),
            color: 'red'
          }
          this.arreglo.push(evento)
        }
        this.nombreMedico = event.option.value.nombreMedico
      }
    )
    this.medicoService.agendaDisponibleMedico(this.idMedico).subscribe(
      (response) => {
        this.eventos = response
        for (let i = 0; i < this.eventos.length; i++) {
          const evento = {
            title: 'DISPONIBLE',
            start: new Date(this.eventos[i].start),
            end: new Date(this.eventos[i].end),
            color: 'green'
          }
          this.arreglo.push(evento)
        }
        this.calendarOptions.events = this.arreglo
      }
    )
  }
}
