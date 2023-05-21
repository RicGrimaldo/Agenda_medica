import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
  Dashboard,
  DashboardService,
} from 'src/app/servicios/dashboard.service';
import esLocale from '@fullcalendar/core/locales/es';
import { Observable } from 'rxjs';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agenda-paciente',
  templateUrl: './agenda-paciente.component.html',
  styleUrls: ['./agenda-paciente.component.css'],
})
export class AgendaPacienteComponent implements OnInit {
  idPaciente:any;
  eventos:any=[];
  arreglo:any=[];
  constructor(
    private dashboardService: DashboardService,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute
  ) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'agenda',
    };
  }
  ngOnInit(): void {
    //Se obtiene todas las citas del paciente
    this.route.params.subscribe((params) => {
      if (params['idPaciente']) {
        this.idPaciente = params['idPaciente'];
        this.usuariosService.agendaPaciente(params['idPaciente']).subscribe(
          (response)=>{
            this.eventos=response;
           for(let i=0; i<this.eventos.length;i++){
            const evento={
              title:this.eventos[i].nombreMedico,
              start: new Date(this.eventos[i].start),
              end: new Date(this.eventos[i].end),
            }
           this.arreglo.push(evento);
           }
           this.calendarOptions.events=this.arreglo;
          }
        )
   
      }
    });


 
  }
  //Configuración del calendario
 calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    height: 500,
    locale: esLocale,
    themeSystem: 'standard',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    initialView: 'dayGridMonth',
    events: [],
  };


}
