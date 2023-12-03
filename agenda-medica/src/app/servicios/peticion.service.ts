import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { Observable, catchError, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PeticionService {
  constructor (
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly _snackBar: MatSnackBar
  ) {
  }

  private getHeaders (): HttpHeaders {
    const token = sessionStorage.getItem('token')
    const authorizationHeader = (token != null) ? `Bearer ${token}` : ''

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: authorizationHeader
    })
  }

  private handleHttpError (error: any): void {
    console.error('Error inesperado:', error)
    this._snackBar.open('token inválido', '', {
      duration: 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
    void this.router.navigate(['/login'])
  }

  private makeRequest (method: string, url: string, data?: any): Observable<any> {
    const requestOptions = {
      headers: this.getHeaders(),
      body: (data !== undefined && data !== null) ? { ...data } : null
    }

    return this.http.request(method, url, requestOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleHttpError(error)
        return throwError(error)
      })
    )
  }

  getRequest (url: string): Observable<any> {
    return this.makeRequest('GET', url)
  }

  postRequest (url: string, data: any): Observable<any> {
    return this.makeRequest('POST', url, data)
  }

  putRequest (url: string, data: any): Observable<any> {
    return this.makeRequest('PUT', url, data)
  }

  deleteRequest (url: string): Observable<any> {
    return this.makeRequest('DELETE', url)
  }
}
