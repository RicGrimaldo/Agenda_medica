import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeticionService } from './peticion.service';

@Injectable({
  providedIn: 'root'
})
export class RecepcionistaService {

  private URL = "http://localhost:8080";
  constructor(
    private peticionService: PeticionService
  ) {
  }

  obtenerRecepcionistas(): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/recepcionistas`);
  }

  guardarRecepcionista(recepcionista: any): Observable<any> {
    const data = Object.assign({}, recepcionista);
    return this.peticionService.postRequest(`${this.URL}/api/recepcionistas/registrar`, data);
  }

  obtenerRecepcionista(id: any): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/recepcionistas/obtener/${id}`);
  }

  editarRecepcionista(recepcionista: any, id: any): Observable<any> {
    const data = Object.assign({}, recepcionista);
    return this.peticionService.putRequest(`${this.URL}/api/recepcionistas/actualizar/${id}`, data);
  }

  eliminarRecepcionista(id: any): Observable<any> {
    return this.peticionService.deleteRequest(`${this.URL}/api/recepcionistas/eliminar/${id}`);
  }
}