import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private URL = "http://localhost:8080";
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
  }
  private getHeaders(): HttpHeaders {

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
  }

  private handleHttpError(error: any): void {
    console.error('Error inesperado:', error);
    this._snackBar.open('token inválido', '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
    this.router.navigate(['/login']);

  }
  obtenerMedicos(): Observable<any> {
    return this.http.get(`${this.URL}/api/medicos`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  guardarMedico(medico: any): Observable<any> {
    const data = Object.assign({}, medico);
    return this.http.post(`${this.URL}/api/medicos/registrar`, data, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  obtenerMedico(id: any): Observable<any> {
    return this.http.get(`${this.URL}/api/medicos/obtener/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  editarMedico(medico: any, id: any): Observable<any> {
    const data = Object.assign({}, medico);
    return this.http.put(`${this.URL}/api/medicos/actualizar/${id}`, data, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  eliminarMedico(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/api/medicos/eliminar/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }
  obtenerEspecialidades(): Observable<any> {
    return this.http.get(`${this.URL}/api/medicos/especialidades`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  citasProgramadasMedico(id: any): Observable<any> {
    return this.http.get(`${this.URL}/api/medicos/citasProgramadas/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }
  agendaMedico(id: any): Observable<any> {
    return this.http.get(`${this.URL}/api/medicos/agenda/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  agendaDisponibleMedico(id: any): Observable<any> {
    return this.http.get(`${this.URL}/api/medicos/agendaDisponible/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }
}
