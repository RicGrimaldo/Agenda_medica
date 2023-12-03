import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Dashboard, DashboardService } from 'src/app/servicios/dashboard.service'
import { UsuariosService } from 'src/app/servicios/usuarios.service'
import { Location } from '@angular/common'
import { PacienteService } from 'src/app/servicios/paciente.service'

@Component({
  selector: 'app-atenderpacientedatos',
  templateUrl: './atenderpacientedatos.component.html',
  styleUrls: ['./atenderpacientedatos.component.css']
})
export class AtenderpacientedatosComponent {
  public dataDashboard$!: Observable<Dashboard>
  idPaciente: any
  paciente: any = {}
  idCita: any
  constructor (
    private readonly dashboardService: DashboardService,
    private readonly usuariosService: UsuariosService,
    private readonly pacienteService: PacienteService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly router: Router
  ) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'lista-pacientes'
    }
    this.dataDashboard$ = dashboardService.dashboardObservable
  }

  ngOnInit (): void {
    // Se obtiene la información del paciente que se va a atender mediante su id
    this.route.params.subscribe((params) => {
      if (params['idPaciente'] != null) {
        this.idPaciente = params['idPaciente']
        this.pacienteService.obtenerPaciente(this.idPaciente).subscribe(
          (response) => {
            this.paciente = response
          }
        )
      }
      if (params['idCita'] != null) {
        this.idCita = params['idCita']
      }
    })
  }

  /* Función para regresar a la pantalla anterior */
  regresar (): void {
    this.location.back()
  }

  /* Función para ver el historial clínico del paciente */
  historialClinicoPaciente () {
    void this.router.navigate(['dashboard/medico/historial-clinico', this.idPaciente])
  }

  /* Función para ir a la pantalla de atender paciente mediante su id e id de la cita */
  atenderPaciente () {
    void this.router.navigate(['dashboard/medico/paciente-diagnostico', this.idPaciente, this.idCita])
  }
}
