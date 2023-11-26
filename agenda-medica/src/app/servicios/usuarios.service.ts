import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
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

  obtenerTodosUsuarios(): Observable<any> {
    return this.http.get(`${this.URL}/api/informacion/usuarios`, { headers: this.getHeaders() }).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }
  login(data: any): Observable<any> {
    return this.http.post(`${this.URL}/api/login/auth`, data);
  }
}
