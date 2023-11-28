import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeticionService } from './peticion.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private URL = "http://localhost:8080";
  constructor(
    private peticionService: PeticionService
  ) {
  }

  obtenerPacientes(): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/pacientes`);
  }

  guardarPaciente(paciente: any): Observable<any> {
    const data = Object.assign({}, paciente);
    return this.peticionService.postRequest(`${this.URL}/api/pacientes/registrar`, data);
  }

  obtenerPaciente(id: any): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/pacientes/obtener/${id}`);
  }

  editarPaciente(paciente: any, id: any): Observable<any> {
    const data = Object.assign({}, paciente);
    return this.peticionService.putRequest(`${this.URL}/api/pacientes/actualizar/${id}`, data);
  }

  eliminarPaciente(id: any): Observable<any> {
    return this.peticionService.deleteRequest(`${this.URL}/api/pacientes/eliminar/${id}`);
  }

  obtenerHistorialClinico(id: any): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/pacientes/historialClinico/${id}`);
  }

  descargarHistorialClinico(id: any): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/pacientes/historialClinico/${id}/descargar`);
  }

  agendaPaciente(id: any): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/pacientes/agenda/${id}`);
  }
}