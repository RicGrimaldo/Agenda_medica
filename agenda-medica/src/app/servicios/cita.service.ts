import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeticionService } from './peticion.service';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private URL = "http://localhost:8080";
  constructor(
    private peticionService: PeticionService
  ) {
  }

  crearCitas(id: any, datos: any): Observable<any> {
    const data = Object.assign({}, datos);
    return this.peticionService.postRequest(`${this.URL}/api/citas/crear/${id}`, data);
  }

  reservarCita(datos: any, id: any): Observable<any> {
    const data = Object.assign({}, datos);
    return this.peticionService.putRequest(`${this.URL}/api/citas/reservar/${id}`, data);
  }

  actualizarCita(datos: any, id: any): Observable<any> {
    const data = Object.assign({}, datos);
    return this.peticionService.putRequest(`${this.URL}/api/citas/actualizar/${id}`, data);
  }

  citasDisponibles(datos: any): Observable<any> {
    const data = Object.assign({}, datos);
    return this.peticionService.postRequest(`${this.URL}/api/citas/citasDisponibles`, data);
  }

  citasProgramadas(): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/citas/citasProgramadas`);
  }
}