import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private URL = "http://localhost:8080";
  private headers: HttpHeaders;
  constructor(
    private http: HttpClient,
    private router: Router,
	private _snackBar: MatSnackBar,
  ) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
  }
  private getHeaders(): HttpHeaders {

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
  }
  obtenerPacientes(): Observable<any> {
    try {
      return this.http.get(`${this.URL}/api/pacientes`, { headers: this.getHeaders() }).pipe(
        catchError((error) => {
        this._snackBar.open('token inválido', '', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          });
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        return throwError(error);
        })
      );
      } catch (error) {
      console.error('Error inesperado:', error);
      return throwError(error);
      }
    }
  
    guardarPaciente(paciente: any): Observable<any> {
    try {
      const data = Object.assign({}, paciente);
      return this.http.post(`${this.URL}/api/pacientes/registrar`, data, { headers: this.getHeaders() }).pipe(
        catchError((error) => {
        this._snackBar.open('token inválido', '', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          });
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        return throwError(error);
        })
      );
      } catch (error) {
      console.error('Error inesperado:', error);
      return throwError(error);
      }
    }
  
    obtenerPaciente(id: any): Observable<any> {
    try {
      return this.http.get(`${this.URL}/api/pacientes/obtener/${id}`, { headers: this.getHeaders() }).pipe(
        catchError((error) => {
        this._snackBar.open('token inválido', '', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          });
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        return throwError(error);
        })
      );
      } catch (error) {
      console.error('Error inesperado:', error);
      return throwError(error);
      }
    }
  
    editarPaciente(paciente: any, id: any): Observable<any> {
    try {
      const data = Object.assign({}, paciente);
      return this.http.put(`${this.URL}/api/pacientes/actualizar/${id}`, data, { headers: this.getHeaders() }).pipe(
        catchError((error) => {
        this._snackBar.open('token inválido', '', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          });
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        return throwError(error);
        })
      );
      } catch (error) {
      console.error('Error inesperado:', error);
      return throwError(error);
      }
    }
  
    eliminarPaciente(id: any): Observable<any> {
    try {
      
      return this.http.delete(`${this.URL}/api/pacientes/eliminar/${id}`, { headers: this.getHeaders() }).pipe(
        catchError((error) => {
        this._snackBar.open('token inválido', '', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          });
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        return throwError(error);
        })
      );
      } catch (error) {
      console.error('Error inesperado:', error);
      return throwError(error);
      }
    }
  
    obtenerHistorialClinico(id: any): Observable<any> {
    try {
      
      return this.http.get(`${this.URL}/api/pacientes/historialClinico/${id}`, { headers: this.getHeaders() }).pipe(
        catchError((error) => {
        this._snackBar.open('token inválido', '', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          });
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        return throwError(error);
        })
      );
      } catch (error) {
      console.error('Error inesperado:', error);
      return throwError(error);
      }
    }
  
    descargarHistorialClinico(id: any): Observable<any> {
    try {
      
      return  this.http.get(`${this.URL}/api/pacientes/historialClinico/${id}/descargar`, { headers: this.getHeaders() }).pipe(
        catchError((error) => {
        this._snackBar.open('token inválido', '', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          });
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        return throwError(error);
        })
      );
      } catch (error) {
      console.error('Error inesperado:', error);
      return throwError(error);
      }
    }
     // Agenda
  agendaPaciente(id: any): Observable<any> {

    try {
      return  this.http.get(`${this.URL}/api/pacientes/agenda/${id}`, { headers: this.getHeaders() }).pipe(
        catchError((error) => {
        this._snackBar.open('token inválido', '', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          });
        this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        return throwError(error);
        })
      );
      } catch (error) {
      console.error('Error inesperado:', error);
      return throwError(error);
      }
  
    }
  
}
