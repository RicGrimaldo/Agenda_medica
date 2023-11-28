import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  Dashboard,
  DashboardService,
} from 'src/app/servicios/dashboard.service';
import { MedicoService } from 'src/app/servicios/medico.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { RecepcionistaService } from 'src/app/servicios/recepcionista.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-buscador-general',
  templateUrl: './buscador-general.component.html',
  styleUrls: ['./buscador-general.component.css'],
})
export class BuscadorGeneralComponent {
  form!: FormGroup;
  medicos: any = {};
  formUsuario: any = {};
  usuarioPorEliminar: any;
  indice: any;

  public dataDashboard$!: Observable<Dashboard>;

  //Columnas de la tabla
  displayedColumns: string[] = ['id', 'nombre', 'curp', 'telefono', 'opciones'];

  //Datos de ejemplo
  usuarios: any[] = [];
  recuperados: any = {};
  dataSource: any;

  //Paginador
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    dashboardService: DashboardService,
    private usuariosService: UsuariosService,
    private recepcionistaService: RecepcionistaService,
    private medicoService: MedicoService,
    private pacienteService: PacienteService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'buscador-general',
    };
    this.form = new FormGroup({
      tipo: new FormControl(this.formUsuario.tipo, Validators.required),
      curp: new FormControl(this.formUsuario.curp, Validators.required),
    });
  }

  ngOnInit(): void {
    this.inicializar();
  }
//Se obtienen todos los usuarios
  inicializar() {
    this.formUsuario.tipo = '1';
    this.usuariosService.obtenerTodosUsuarios().subscribe(
      (response) => {
        this.recuperados = response;
        this.onSelectChange(this.formUsuario.tipo);
      },

      (error) => {
        console.log(error);
      }
    );
  }
/* Función para mostrar usuarios por su tipo */
  onSelectChange(tipo: string) {
    this.usuarios = [];
    if (!this.recuperados.medicos) {
      return;
    }
    switch (tipo) {
      case '1':
        let medico = this.recuperados.medicos;

        for (let i = 0; i < medico.length; i++) {
          const objecto = {
            id: medico[i].idMedico,
            nombre: medico[i].nombreMedico,
            curp: medico[i].CURPMedico,
            telefono: medico[i].telefonoMedico,
          };
          this.usuarios.push(objecto);
        }
        break;
      case '2':
        let paciente = this.recuperados.pacientes;

        for (let i = 0; i < paciente.length; i++) {
          const objecto = {
            id: paciente[i].idPaciente,
            nombre: paciente[i].nombrePaciente,
            curp: paciente[i].CURPPaciente,
            telefono: paciente[i].telefonoPaciente,
          };
          this.usuarios.push(objecto);
        }
        break;
      case '3':
        let recepcionistas = this.recuperados.recepcionistas;

        for (let i = 0; i < recepcionistas.length; i++) {
          const objecto = {
            id: recepcionistas[i].idRecepcionista,
            nombre: recepcionistas[i].nombreRecepcionista,
            curp: recepcionistas[i].CURPRecepcionista,
            telefono: recepcionistas[i].telefonoRecepcionista,
          };
          this.usuarios.push(objecto);
        }
        break;
    }
    this.dataSource = new MatTableDataSource(this.usuarios);
    this.dataSource.paginator = this.paginator;
    this.paginator.firstPage();
  }
/* Funcion para seleccionar el id del usuario por eliminar */
  seleccionarUsuario(idUsuario: any) {
    this.usuarioPorEliminar = idUsuario;
  }
/* Función para eliminar el usuario */
  eliminarUsuario() {
    switch (this.formUsuario.tipo) {
      case '1':
        console.log(this.recuperados['medicos']);
        this.indice = this.recuperados['medicos'].findIndex(
          (persona: any) => persona.idMedico === this.usuarioPorEliminar
        );

        if (this.indice !== -1) {
          this.recuperados['medicos'].splice(this.indice, 1);
        }
        this.onSelectChange('1');
        this.medicoService.eliminarMedico(this.usuarioPorEliminar).subscribe(
          (response) => {
            console.log(response);
          },

          (error) => {
            console.log(error);
          }
        );
        break;

      case '2':
        console.log(this.recuperados['pacientes']);
        this.indice = this.recuperados['pacientes'].findIndex(
          (persona: any) => persona.idPaciente === this.usuarioPorEliminar
        );

        if (this.indice !== -1) {
          this.recuperados['pacientes'].splice(this.indice, 1);
        }
        this.onSelectChange('2');
        this.pacienteService
          .eliminarPaciente(this.usuarioPorEliminar)
          .subscribe(
            (response) => {
              console.log(response);
            },

            (error) => {
              console.log(error);
            }
          );
        break;

      case '3':
        console.log(this.recuperados['recepcionistas']);
        this.indice = this.recuperados['recepcionistas'].findIndex(
          (persona: any) => persona.idRecepcionista === this.usuarioPorEliminar
        );

        if (this.indice !== -1) {
          this.recuperados['recepcionistas'].splice(this.indice, 1);
        }
        this.onSelectChange('3');
        this.recepcionistaService
          .eliminarRecepcionista(this.usuarioPorEliminar)
          .subscribe(
            (response) => {
              console.log(response);
            },

            (error) => {
              console.log(error);
            }
          );
        break;
    }
  }
/* Función para redireccionar cuando se desea editar un usuario */
  editarUsuario(id: any) {
    switch (this.formUsuario.tipo) {
      case '1':
        this.router.navigate(['/dashboard/administracion/editar-medico', id]);
        break;
      case '2':
        this.router.navigate(['/dashboard/administracion/editar-paciente', id]);
        break;
      case '3':
        this.router.navigate([
          '/dashboard/administracion/editar-recepcionista',
          id,
        ]);
        break;
    }
  }
/* Función para buscar usuario por CURP */
  buscarPorCURP(){

const user = this.usuarios.find((user) => user.curp === this.formUsuario.curp);
if(user!=null){
  console.log(user);
  this.usuarios=[];
  this.usuarios.push(user);
  this.dataSource = new MatTableDataSource(this.usuarios);
  this.dataSource.paginator = this.paginator;
  this.paginator.firstPage();
}else{
  this._snackBar.open('No se encontró ningún usuario con ese CURP', '', {
    duration: 1500,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  });
}

  }
}
