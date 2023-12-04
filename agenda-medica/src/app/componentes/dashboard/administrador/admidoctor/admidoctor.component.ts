import { Component } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, map, startWith } from 'rxjs'
import {
  Dashboard,
  DashboardService
} from 'src/app/servicios/dashboard.service'
import { MedicoService } from 'src/app/servicios/medico.service'
@Component({
  selector: 'app-admidoctor',
  templateUrl: './admidoctor.component.html',
  styleUrls: ['./admidoctor.component.css']
})
export class AdmidoctorComponent {
  medico: any = {}
  idMedico: any = null
  form!: FormGroup
  titulo: any = 'Agregar Medico'
  idEspecialidad: any = null
  show: any
  public dataDashboard$!: Observable<Dashboard>
  constructor (
    dashboardService: DashboardService,
    private readonly medicoService: MedicoService,
    private readonly _snackBar: MatSnackBar,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'medico'
    }
  }

  /* Valores inicializados */
  options: any = []
  filteredOptions!: Observable<any>

  ngOnInit (): void {
    /* Se obtienen las especialidades */
    this.medicoService.obtenerEspecialidades().subscribe(
      (response) => {
        this.options = response.map((especialidad: any) => especialidad)
        console.log(this.options)
        this.filteredOptions = this._setupFilterObservable(
          this.form.controls['especialidadMedico'],
          this.options
        )
      }
    )

    /*  Función para declarar formularios si se desea editar un médico o crear uno nuevo */
    this.route.params.subscribe((params) => {
      if (params['idMedico'] != null) {
        this.idMedico = params['idMedico']
        this.obtenerMedico(this.idMedico)
        this.titulo = 'Editar Medico'
        this.show = false
        this.form = new FormGroup({
          nombreMedico: new FormControl(this.medico.nombreMedico, Validators.required),
          CURPMedico: new FormControl(this.medico.CURPMedico, Validators.required),
          fechaNacimientoMedico: new FormControl(this.medico.fechaNacimientoMedico, Validators.required),
          correoMedico: new FormControl(this.medico.correoMedico, Validators.required),
          telefonoMedico: new FormControl(this.medico.telefonoMedico, Validators.required),
          direccionMedico: new FormControl(this.medico.direccionMedico, Validators.required),
          consultorioMedico: new FormControl(this.medico.consultorioMedico, Validators.required),
          especialidadMedico: new FormControl(this.medico.especialidadMedico, Validators.required),
          cedulaProfesionalMedico: new FormControl(this.medico.cedulaProfesionalMedico, Validators.required),
          bloqueadoMedico: new FormControl(this.medico.bloqueadoMedico)
        })
      } else {
        this.show = true
        this.form = new FormGroup({
          nombreMedico: new FormControl(this.medico.nombreMedico, Validators.required),
          CURPMedico: new FormControl(this.medico.CURPMedico, Validators.required),
          fechaNacimientoMedico: new FormControl(this.medico.fechaNacimientoMedico, Validators.required),
          correoMedico: new FormControl(this.medico.correoMedico, Validators.required),
          telefonoMedico: new FormControl(this.medico.telefonoMedico, Validators.required),
          direccionMedico: new FormControl(this.medico.direccionMedico, Validators.required),
          consultorioMedico: new FormControl(this.medico.consultorioMedico, Validators.required),
          especialidadMedico: new FormControl(this.medico.especialidadMedico, Validators.required),
          cedulaProfesionalMedico: new FormControl(this.medico.cedulaProfesionalMedico, Validators.required),
          contrasenaMedico: new FormControl(this.medico.contrasenaMedico, Validators.required),
          bloqueadoMedico: new FormControl(this.medico.bloqueadoMedico)
        })
      }
    })
  }

  /* Función para el guardar o actualizar un médico */
  formSubmit () {
    if (this.medico.bloqueadoMedico === true) {
      this.medico.bloqueadoMedico = 1
    } else {
      this.medico.bloqueadoMedico = 0
    }

    this.medico.especialidadMedico = this.idEspecialidad
    if (this.idMedico != null) {
      this.medicoService
        .editarMedico(this.medico, this.idMedico)
        .subscribe(
          (response) => {
            this._snackBar.open(response, '', {
              duration: 1000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            })
          }

        )

      this.form.reset()
      void this.router.navigate(['/dashboard/administracion'])
    } else {
      this.medicoService.guardarMedico(this.medico).subscribe(
        (response) => {
          this._snackBar.open(response, '', {
            duration: 1000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          })
          this.form.reset()
          this.medico.bloqueadoMedico = false
        }
      )
    }
  }

  /* Función para obtener la información de un médico */
  obtenerMedico (id: any) {
    this.medicoService.obtenerMedico(id).subscribe(
      response => {
        this.medico = response
        this.idEspecialidad = this.medico.especialidadMedico
        const user = this.options.filter((u: any) => u.idEspecialidad === this.medico.especialidadMedico)[0]
        this.medico.especialidadMedico = user.nombreEspecialidad
      },
      error => {
        console.log(error)
      }
    )
  }

  /*  Funciones de filtrado para el autocompletado de especialidades */
  private _setupFilterObservable (
    control: AbstractControl,
    options: any
  ): Observable<any> {
    return control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(options, value))
    )
  }

  private _filter (options: any, value: string): any {
    const filterValue = String(value).toLowerCase()
    return options.filter((option: any) =>
      option.nombreEspecialidad.toLowerCase().includes(filterValue)
    )
  }

  /* Función para guardar el id de la especialidad del médico */
  onSelectionChange (event: any) {
    console.log(event.option.value)
    this.medico.especialidadMedico = event.option.value.nombreEspecialidad
    this.idEspecialidad = event.option.value.idEspecialidad
  }
}
