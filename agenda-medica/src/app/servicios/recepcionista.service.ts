import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecepcionistaService {

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

  obtenerRecepcionistas(): Observable<any> {
    return this.http.get(`${this.URL}/api/recepcionistas`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  guardarRecepcionista(recepcionista: any): Observable<any> {
    const data = Object.assign({}, recepcionista);
    return this.http.post(`${this.URL}/api/recepcionistas/registrar`, data, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  obtenerRecepcionista(id: any): Observable<any> {
    return this.http.get(`${this.URL}/api/recepcionistas/obtener/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  editarRecepcionista(recepcionista: any, id: any): Observable<any> {
    const data = Object.assign({}, recepcionista);
    return this.http.put(`${this.URL}/api/recepcionistas/actualizar/${id}`, data, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  eliminarRecepcionista(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/api/recepcionistas/eliminar/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }
}