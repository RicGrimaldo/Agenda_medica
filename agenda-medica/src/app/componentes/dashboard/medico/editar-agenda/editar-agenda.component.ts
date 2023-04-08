import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard, DashboardService } from 'src/app/servicios/dashboard.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-editar-agenda',
  templateUrl: './editar-agenda.component.html',
  styleUrls: ['./editar-agenda.component.css']
})
export class EditarAgendaComponent {
  public dataDashboard$!: Observable<Dashboard>;

  constructor(private dashboardService: DashboardService) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'crear-agenda'
    };
    this.dataDashboard$ = dashboardService.dashboardObservable;
  }
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    height: 500,
    locale: esLocale,
    themeSystem: 'bootstrap5',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    initialView: 'dayGridMonth',
    eventClick: this.handleEventClick.bind(this), // MUST ensure `this` context is maintained
    events: [
      {
        title: 'Fernando Chimal',
        start: new Date('2023-04-02T10:30:00'),
        end: new Date('2023-04-02T12:00:00')
      },
      { title: 'event 2', date: '2023-04-10' ,   color: 'black'},
      { title: 'event 3', date: '2023-04-15', colo:'green' },
      { title: 'event 4', date: '2023-04-18', color: 'yellow' },
    ],
  };

  handleEventClick(eventInfo: any) {
    console.log('Evento clickeado:', eventInfo.event);
    // Agrega aquí la lógica que deseas ejecutar cuando se hace clic en un evento
  }
}