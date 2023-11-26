import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dashboard, DashboardService } from 'src/app/servicios/dashboard.service';
import { MedicoService } from 'src/app/servicios/medico.service';

@Component({
  selector: 'app-listadepacientes',
  templateUrl: './listadepacientes.component.html',
  styleUrls: ['./listadepacientes.component.css']
})
export class ListadepacientesComponent {
  public dataDashboard$!: Observable<Dashboard>;
  idMedico:any;
  idPaciente :any;
  citas: any = [];
  idCita:any;
  indice: any;
  medicos:any={};
  curpPaciente:any;
  citasGeneral:any=[];

  constructor(private dashboardService: DashboardService,
    private medicoService: MedicoService,
    private route: ActivatedRoute,
    private router: Router) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'lista-pacientes'
    };
    this.dataDashboard$ = dashboardService.dashboardObservable;
  }
    /* Columnas de la tabla */
    displayedColumns: string[] = ['fecha', 'horaInicio', 'horaFin', 'paciente', 'modalidad', 'consultorio','opciones'];
    dataSource :any;

  ngOnInit():void{
     //Se buscan las citas programadas con el id del médico
     this.route.params.subscribe((params) => {
      if (params['idMedico']) {
        this.idMedico= params['idMedico'];
        this.medicoService.citasProgramadasMedico(this.idMedico).subscribe(
          (response)=>{
            this.citas=response;
            this.dataSource = new MatTableDataSource(this.citas);
            this.dataSource.paginator = this.paginator;
            this.paginator.firstPage();
          }
        )
   
      }
    });

  }

   
 /*  Paginación de la tabla */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

/*   Función para ver la información del paciente con id del paciente y el id de la cita */
    verInformacionPaciente(idPaciente:any, idCita:any){
      this.router.navigate(['dashboard/medico/paciente-datos',idPaciente, idCita]);
      
    }
 
}
