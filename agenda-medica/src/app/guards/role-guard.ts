import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'

interface RouteData {
  requiredRoles?: string[]
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor (private readonly router: Router) {}
  // Funcionalidad de guardas, para que cada tipo de usuario solo pueda acceder a lo que le corresponde
  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    let userRole = sessionStorage.getItem('rol')
    switch (userRole) {
      case '1':
        userRole = 'paciente'
        break
      case '2':
        userRole = 'medico'
        break
      case '3':
        userRole = 'recepcion'
        break
      case '4':
        userRole = 'admin'
        break
    }
    const requiredRoles = (next.data as RouteData).requiredRoles
    if ((requiredRoles != null) && (userRole != null) && requiredRoles.includes(userRole)) {
      return true
    } else {
      sessionStorage.removeItem('rol')
      sessionStorage.removeItem('id')
      return this.router.parseUrl('/login')
    }
  }
}
