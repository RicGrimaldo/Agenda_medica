import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { Dashboard, DashboardService } from 'src/app/servicios/dashboard.service'

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css']
})
export class RecepcionComponent {
  public dataDashboard$!: Observable<Dashboard>
  constructor (
    dashboardService: DashboardService
  ) {
    this.dataDashboard$ = dashboardService.dashboardObservable
  }
}
