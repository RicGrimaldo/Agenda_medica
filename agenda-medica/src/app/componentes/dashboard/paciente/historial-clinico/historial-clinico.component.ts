import { Component, ViewChild } from '@angular/core';
import {  DashboardService } from 'src/app/servicios/dashboard.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { CitaService } from 'src/app/servicios/cita.service';

@Component({
  selector: 'app-historial-clinico',
  templateUrl: './historial-clinico.component.html',
  styleUrls: ['./historial-clinico.component.css']
})
export class HistorialClinicoComponent {
  idPaciente :any;
  citas: any = [];
  idCita:any;
  indice: any;
  fechaHoy:any;
  horaActual:any;
  rol:any;
  nombrePaciente:any="";
  constructor(
    dashboardService: DashboardService,
    private pacienteService:PacienteService,
    private citaService: CitaService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private http: HttpClient
    ) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'historial-clinico'
    };

  }
  /* Columnas de la tabla */
  displayedColumns: string[] = ['fecha', 'hora', 'medico', 'consultorio','modalidad','informacion','opciones'];
  dataSource :any;

 /*  Paginación de la tabla */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(){
       //Se obtienen los datos del paciente
       this.route.params.subscribe((params) => {
        if (params['idPaciente']) {
          this.idPaciente = params['idPaciente'];
         this.pacienteService.obtenerHistorialClinico(this.idPaciente).subscribe(
          (response)=>{
           this.citas = response;
           if(this.citas.length!=0){
            this.nombrePaciente=" : "+this.citas[0].nombrePaciente;
           }
       
           this.dataSource = new MatTableDataSource(this.citas);
           this.dataSource.paginator = this.paginator;
           this.paginator.firstPage();
           this.fechaHoy = new Date().toISOString().slice(0, 10);
           
           const date = new Date();
           const options = { hour12: false };
           this.horaActual = date.toLocaleTimeString('es-ES', options);
          
          }
         )
        }
       
      });
      this.rol=sessionStorage.getItem('rol');
      if(this.rol==2){
        this.displayedColumns = ['fecha', 'hora', 'medico', 'consultorio','modalidad','informacion'];

      }
     
     
  }
/* Se selecciona una cita por cancelar */
  seleccionarCita(id:any){
    this.idCita=id;
  }
/*   Se cancela la cita y se elimina de la tabla y base de datos */
  cancelarCita(){
    const cita = {
      idPaciente: null,
      modalidad:null
    }
    this.indice = this.citas.findIndex(
      (cita: any) => cita.idCita === this.idCita
    );

    if (this.indice !== -1) {
      this.citas.splice(this.indice, 1);
      this.dataSource = new MatTableDataSource(this.citas);
      this.dataSource.paginator = this.paginator;
      this.paginator.firstPage();
    }

    this.citaService.actualizarCita(cita, this.idCita).subscribe(
      (response)=>{
        console.log(response);
      }
   
    )
    
  }
  /* Regresa a la ventana anterior */
  regresar(): void {
    this.location.back();
  }

/*   Se descarga el historial clínico del paciente en un archivo Excel */
  descargar():void{
    const enlace = `http://localhost:8080/api/pacientes/historialClinico/${this.idPaciente}/descargar`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    });
    
    this.http.get(enlace, { headers: headers, responseType: 'blob' })
      .subscribe(blob => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      }, error => {
        console.error('Error al descargar el archivo:', error);
      });

  
  }

}