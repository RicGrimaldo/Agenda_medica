import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { Dashboard, DashboardService } from 'src/app/servicios/dashboard.service'

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent {
  id: any
  public dataDashboard$!: Observable<Dashboard>
  constructor (
    private readonly dashboardService: DashboardService
  ) {
    this.dataDashboard$ = dashboardService.dashboardObservable
  }

  ngOnInit (): void {
    this.id = sessionStorage.getItem('id')
  }
}
