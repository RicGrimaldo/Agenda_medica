import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

export interface Dashboard {
  menuActivo: string
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  /*  Servicio para el manejo de menú activo del header */
  static dashboardObservable: any

  private readonly dashboardObservablePrivate: BehaviorSubject<Dashboard> =
    new BehaviorSubject<Dashboard>({
      menuActivo: 'tablero-principal'
    })

  get dashboardObservable (): Observable<Dashboard> {
    return this.dashboardObservablePrivate.asObservable()
  }

  get dashboardObservableData (): Dashboard {
    return this.dashboardObservablePrivate.getValue()
  }

  set dashboardObservableData (data: Dashboard) {
    this.dashboardObservablePrivate.next(data)
  }
}
