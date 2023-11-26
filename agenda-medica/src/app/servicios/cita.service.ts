import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private URL = "http://localhost:8080";
  private headers: HttpHeaders;
/* Servicio para realizar el CRUD de la aplicación */
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

  crearCitas(id: any, datos: any): Observable<any> {

    try {
      const data = Object.assign({}, datos);
      return  this.http.post(`${this.URL}/api/citas/crear/${id}`, data, { headers: this.getHeaders() }).pipe(
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
  
    reservarCita(datos: any, id: any): Observable<any> {
  
    try {
      const data = Object.assign({}, datos);
      return  this.http.put(`${this.URL}/api/citas/reservar/${id}`, data, { headers: this.getHeaders() }).pipe(
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
  
    actualizarCita(datos: any, id: any): Observable<any> {
    try {
      const data = Object.assign({}, datos);
      return  this.http.put(`${this.URL}/api/citas/actualizar/${id}`, data, { headers: this.getHeaders() }).pipe(
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
  
    citasDisponibles(datos: any): Observable<any> {
    try {
      const data = Object.assign({}, datos);
      return  this.http.post(`${this.URL}/api/citas/citasDisponibles`, data, { headers: this.getHeaders() }).pipe(
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
  
    citasProgramadas(): Observable<any> {
  
    try {
      return  this.http.get(`${this.URL}/api/citas/citasProgramadas`, { headers: this.getHeaders() }).pipe(
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
