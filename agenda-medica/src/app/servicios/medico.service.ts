import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { PeticionService } from './peticion.service'

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private readonly URL = 'http://localhost:8080'
  constructor (
    private readonly peticionService: PeticionService
  ) {
  }

  obtenerMedicos (): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/medicos`)
  }

  guardarMedico (medico: any): Observable<any> {
    const data = Object.assign({}, medico)
    return this.peticionService.postRequest(`${this.URL}/api/medicos/registrar`, data)
  }

  obtenerMedico (id: number): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/medicos/obtener/${id}`)
  }

  editarMedico (medico: any, id: number): Observable<any> {
    const data = Object.assign({}, medico)
    return this.peticionService.putRequest(`${this.URL}/api/medicos/actualizar/${id}`, data)
  }

  eliminarMedico (id: number): Observable<any> {
    return this.peticionService.deleteRequest(`${this.URL}/api/medicos/eliminar/${id}`)
  }

  obtenerEspecialidades (): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/medicos/especialidades`)
  }

  citasProgramadasMedico (id: number): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/medicos/citasProgramadas/${id}`)
  }

  agendaMedico (id: number): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/medicos/agenda/${id}`)
  }

  agendaDisponibleMedico (id: number): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/medicos/agendaDisponible/${id}`)
  }
}
