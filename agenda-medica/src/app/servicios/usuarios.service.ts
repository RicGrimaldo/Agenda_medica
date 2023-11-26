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

  obtenerTodosUsuarios(): Observable<any> {
	try {
		return this.http.get(`${this.URL}/api/informacion/usuarios`, { headers: this.getHeaders() }).pipe(
		  catchError((error) => {
			console.error('token inválido', error);
			this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
			return throwError(error);
		  })
		);
	  } catch (error) {
		console.error('Error inesperado:', error);
		return throwError(error);
	  }
  }

 

  // Login
  login(data: any): Observable<any> {
    return this.http.post(`${this.URL}/api/login/auth`, data);
  }
}
