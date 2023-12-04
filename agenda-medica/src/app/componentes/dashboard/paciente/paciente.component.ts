import { Component, OnInit } from '@angular/core'
import {
  Dashboard,
  DashboardService
} from 'src/app/servicios/dashboard.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  id: any
  public dataDashboard$!: Observable<Dashboard>
  constructor (private readonly dashboardService: DashboardService) {
    this.dataDashboard$ = dashboardService.dashboardObservable
  }

  ngOnInit (): void {
    this.id = sessionStorage.getItem('id')
  }
}
