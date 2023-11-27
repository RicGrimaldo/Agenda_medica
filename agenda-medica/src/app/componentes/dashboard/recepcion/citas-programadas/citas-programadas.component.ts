import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, startWith, map } from 'rxjs';
import { DashboardService } from 'src/app/servicios/dashboard.service';
import { UsuariosService } from 'src/app/servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-citas-programadas',
  templateUrl: './citas-programadas.component.html',
  styleUrls: ['./citas-programadas.component.css']
})
export class CitasProgramadasComponent {
  idPaciente :any;
  citas: any = [];
  idCita:any;
  indice: any;
  form: FormGroup;
  medicos:any=[];
  idMedico:any;
  curpPaciente:any;
  citasGeneral:any=[];
  constructor(dashboardService: DashboardService,
     private fb: FormBuilder,
     private usuariosService: UsuariosService,
     private _snackBar: MatSnackBar,) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'citas-programadas',
    };
    this.form = this.fb.group({
      curp: new FormControl(this.curpPaciente, Validators.required),
      idMedico: new FormControl(this.idMedico, Validators.required),
    });
    
  }
  /* Columnas de la tabla */
  displayedColumns: string[] = ['fecha', 'hora', 'paciente','medico', 'modalidad', 'consultorio','opciones'];
  dataSource :any;

  
  ngOnInit() {
    /* Se obtienen las citas programadas entre los pacientes y médicos */
    this.usuariosService.citasProgramadas().subscribe(
      (response) => {
        console.log("Respuesta: ")
        console.log(response);
        this.citas = response;
        this.citasGeneral = response;
        this.dataSource = new MatTableDataSource(this.citas);
        this.dataSource.paginator = this.paginator;
        this.paginator.firstPage();
      }
    );
  
    /* Se obtiene todos los medicos */
    this.usuariosService.obtenerMedicos().subscribe(
      (response) => {
        this.medicos = response;
      }
    );
  }
  


  

 /*  Paginación de la tabla */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }
   //Filtrado por idMedico y la CURP del paciente
  submit(){

  let filtrado = this.citasGeneral.filter((cita:any) => {
    return cita.idMedico == this.idMedico && cita.CURPPaciente === this.curpPaciente;
  });
  
  this.citas=filtrado;
  this.dataSource = new MatTableDataSource(this.citas);
  this.dataSource.paginator = this.paginator;
  this.paginator.firstPage();
  if(this.citas.length==0){
    this._snackBar.open('El usuario no tiene citas o no existe', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  }
  /* Selección, cancelación de cita, y eliminación de la tabla */
  seleccionarCita(idCita:any){
    this.idCita=idCita;
  }
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
    this.indice=this.citasGeneral.findIndex(
      (cita: any) => cita.idCita === this.idCita
    );
    if (this.indice !== -1) {
      this.citasGeneral.splice(this.indice, 1);

    }

/* Se actualiza la cita cancelada */
    this.usuariosService.actualizarCita(cita, this.idCita).subscribe(

    )

  }
  
  
}

