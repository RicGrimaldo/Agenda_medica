import { Component, ViewChild } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTableDataSource } from '@angular/material/table'
import { CitaService } from 'src/app/servicios/cita.service'
import { DashboardService } from 'src/app/servicios/dashboard.service'
import { MedicoService } from 'src/app/servicios/medico.service'

@Component({
  selector: 'app-citas-programadas',
  templateUrl: './citas-programadas.component.html',
  styleUrls: ['./citas-programadas.component.css']
})
export class CitasProgramadasComponent {
  idPaciente: any
  citas: any = []
  idCita: any
  indice: any
  form: FormGroup
  medicos: any = []
  idMedico: any
  curpPaciente: any
  citasGeneral: any = []
  constructor (dashboardService: DashboardService,
    private readonly fb: FormBuilder,
    private readonly citaService: CitaService,
    private readonly medicoService: MedicoService,
    private readonly _snackBar: MatSnackBar) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'citas-programadas'
    }
    this.form = this.fb.group({
      curp: new FormControl(this.curpPaciente, Validators.required),
      idMedico: new FormControl(this.idMedico, Validators.required)
    })
  }

  /* Columnas de la tabla */
  displayedColumns: string[] = ['fecha', 'hora', 'paciente', 'medico', 'modalidad', 'consultorio', 'opciones']
  dataSource: any

  ngOnInit (): void {
    /* Se obtienen las citas programadas entre los pacientes y médicos */
    this.citaService.citasProgramadas().subscribe(
      (response) => {
        console.log(response)
        this.citas = response
        this.citasGeneral = response
        this.dataSource = new MatTableDataSource(this.citas)
        this.dataSource.paginator = this.paginator
        this.paginator.firstPage()
      }
    )

    /* Se obtiene todos los medicos */
    this.medicoService.obtenerMedicos().subscribe(

      (response) => {
        this.medicos = response
      }
    )
  }

  /*  Paginación de la tabla */
  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit (): void {
    if (this.dataSource !== null) {
      this.dataSource.paginator = this.paginator
    }
  }

  // Filtrado por idMedico y la CURP del paciente
  submit (): void {
    const filtrado = this.citasGeneral.filter((cita: any) => {
      return cita.idMedico == this.idMedico && cita.CURPPaciente === this.curpPaciente
    })

    this.citas = filtrado
    this.dataSource = new MatTableDataSource(this.citas)
    this.dataSource.paginator = this.paginator
    this.paginator.firstPage()
    if (this.citas.length === 0) {
      this._snackBar.open('El usuario no tiene citas o no existe', '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      })
    }
  }

  /* Selección, cancelación de cita, y eliminación de la tabla */
  seleccionarCita (idCita: any): void {
    this.idCita = idCita
  }

  cancelarCita (): void {
    const cita = {
      idPaciente: null,
      modalidad: null
    }
    this.indice = this.citas.findIndex(
      (cita: any) => cita.idCita === this.idCita
    )

    if (this.indice !== -1) {
      this.citas.splice(this.indice, 1)
      this.dataSource = new MatTableDataSource(this.citas)
      this.dataSource.paginator = this.paginator
      this.paginator.firstPage()
    }
    this.indice = this.citasGeneral.findIndex(
      (cita: any) => cita.idCita === this.idCita
    )
    if (this.indice !== -1) {
      this.citasGeneral.splice(this.indice, 1)
    }

    /* Se actualiza la cita cancelada */
    this.citaService.actualizarCita(cita, this.idCita).subscribe(

    )
  }
}
