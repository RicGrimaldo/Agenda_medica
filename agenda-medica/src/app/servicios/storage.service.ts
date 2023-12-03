import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  /* Servicio para el manejo de items de session storage */
  setItem (key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value))
  }

  getItem (key: string): any {
    const value = sessionStorage.getItem(key)
    return (value != null) ? JSON.parse(value) : null
  }

  removeItem (key: string): void {
    sessionStorage.removeItem(key)
  }

  clear (): void {
    sessionStorage.clear()
  }
}
