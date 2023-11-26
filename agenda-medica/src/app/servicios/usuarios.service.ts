import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PeticionService } from './peticion.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private URL = "http://localhost:8080";
  constructor(
    private peticionService: PeticionService
  ) {
  }
  obtenerTodosUsuarios(): Observable<any> {
    return this.peticionService.getRequest(`${this.URL}/api/informacion/usuarios`);
  }
  login(data: any): Observable<any> {
    return this.peticionService.postRequest(`${this.URL}/api/login/auth`, data);
  }
}
