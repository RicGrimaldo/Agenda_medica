import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import {
  Dashboard,
  DashboardService
} from 'src/app/servicios/dashboard.service'

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {
  public dataDashboard$!: Observable<Dashboard>
  constructor (dashboardService: DashboardService) {
    this.dataDashboard$ = dashboardService.dashboardObservable
  }
}
