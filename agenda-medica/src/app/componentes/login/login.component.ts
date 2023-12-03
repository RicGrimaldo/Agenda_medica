import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ActivatedRoute, Router } from '@angular/router'
import { StorageService } from 'src/app/servicios/storage.service'
import { UsuariosService } from 'src/app/servicios/usuarios.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup
  dataUsuarios: any = {}
  datosUsuarios: any = {}
  rol: any
  id: any
  token: any
  constructor (
    private readonly fb: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly usuariosService: UsuariosService,
    private readonly route: ActivatedRoute,
    private readonly storage: StorageService
  ) {
    this.form = this.fb.group({
      usuario: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit () {
    sessionStorage.removeItem('rol')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('token')
  }

  onSubmitLogin () {
    this.dataUsuarios.email_usuario = this.form.value.usuario
    this.dataUsuarios.password_usuario = this.form.value.password
    /* Función para iniciar sesión */
    this.usuariosService.login(this.dataUsuarios).toPromise()
      .then(async (response) => {
        console.log(response)
        this.datosUsuarios = response
        return await Promise.all([
          this.storage.setItem('id', this.datosUsuarios.id),
          this.storage.setItem('rol', this.datosUsuarios.rol),
          this.storage.setItem('token', this.datosUsuarios.token)
        ]).then(() => {
          this.id = this.storage.getItem('id')
          this.rol = this.storage.getItem('rol')
          this.token = this.storage.getItem('token')
        })
      })
      .then(() => {
        switch (this.rol) {
          case 1:
            void this.router.navigate(['dashboard/paciente/agenda', this.id])
            break

          case 2:
            void this.router.navigate(['dashboard/medico/principal-medico', this.id])
            break

          case 3:
            void this.router.navigate(['dashboard/recepcion'])
            break

          case 4:
            void this.router.navigate(['dashboard/administracion'])
            break
        }
      })
      .catch((error) => {
        // Manejar el error si ocurre
        console.error(error)
      })
  }
}
