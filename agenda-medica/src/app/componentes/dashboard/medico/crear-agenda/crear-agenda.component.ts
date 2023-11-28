import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard, DashboardService } from 'src/app/servicios/dashboard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitaService } from 'src/app/servicios/cita.service';

@Component({
  selector: 'app-crear-agenda',
  templateUrl: './crear-agenda.component.html',
  styleUrls: ['./crear-agenda.component.css']
})
export class CrearAgendaComponent {
  public dataDashboard$!: Observable<Dashboard>;
  form!: FormGroup;
  agenda: any = {};
  idMedico:any;

  constructor(private dashboardService: DashboardService, 
    private citaService: CitaService,
    private _snackBar: MatSnackBar,) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'crear-agenda'
    };
    this.dataDashboard$ = dashboardService.dashboardObservable;
  }
 
  ngOnInit():void {
   /*  Formulario para crear citas */
    this.form = new FormGroup({
      fechaInicio: new FormControl(this.agenda.fechaInicio, Validators.required),
      fechaFin: new FormControl(this.agenda.fechaFin, Validators.required),
      horaInicio: new FormControl(this.agenda.horaInicio, Validators.required),
      inicioAlmuerzo: new FormControl(this.agenda.inicioAlmuerzo, Validators.required),
      finAlmuerzo: new FormControl(this.agenda.finAlmuerzo, Validators.required),
      horaFin: new FormControl(this.agenda.horaFin, Validators.required),
      duracionCitas: new FormControl(this.agenda.duracionCitas, Validators.required),
    });
    this.idMedico= sessionStorage.getItem('id');
  }
/* Función para crear citas con el id del médico */
  formSubmit(){
      this.citaService.crearCitas(this.idMedico, this.agenda).subscribe(
        (response)=>{
          this._snackBar.open(response, '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
           this.form.reset();
        },
        (error)=>{
         
          this.form.reset();
        }
      )
     
  
  }


}
