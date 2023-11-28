import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
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
  private makeRequest(method: string, url: string, data?: any): Observable<any> {
    const requestOptions = {
      headers: this.getHeaders(),
      body: data ? Object.assign({}, data) : null
    };

    return this.http.request(method, url, requestOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error);
        return throwError(error);
      })
    );
  }

  getRequest(url: string): Observable<any> {
    return this.makeRequest('GET', url);
  }

  postRequest(url: string, data: any): Observable<any> {
    return this.makeRequest('POST', url, data);
  }

  putRequest(url: string, data: any): Observable<any> {
    return this.makeRequest('PUT', url, data);
  }

  deleteRequest(url: string): Observable<any> {
    return this.makeRequest('DELETE', url);
  }
}