import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  Dashboard,
  DashboardService,
} from 'src/app/servicios/dashboard.service';
import { RecepcionistaService } from 'src/app/servicios/recepcionista.service';

@Component({
  selector: 'app-adminsecretaria',
  templateUrl: './adminsecretaria.component.html',
  styleUrls: ['./adminsecretaria.component.css'],
})
export class AdminsecretariaComponent {
  recepcionista: any = {};
  idRecepcionista: any;
  form!: FormGroup;
  show:any;
  titulo: any = 'Agregar Recepcionista';

  public dataDashboard$!: Observable<Dashboard>;
  constructor(
    dashboardService: DashboardService,
    private recepcionistaService: RecepcionistaService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    dashboardService.dashboardObservableData = {
      menuActivo: 'recepcion',
    };
  }

  ngOnInit(): void {
    /*  Función para declarar formularios si se desea editar un recepcionista o crear uno nuevo */
    this.route.params.subscribe((params) => {
      if (params['idRecepcionista']) {
        this.idRecepcionista = params['idRecepcionista'];
        this.obtenerRecepcionista(this.idRecepcionista);
        this.titulo = 'Editar Recepcionista';
        this.show=false;
        this.form = new FormGroup({
          nombreRecepcionista: new FormControl(this.recepcionista.nombreRecepcionista,Validators.required),
          CURPRecepcionista: new FormControl(this.recepcionista.CURPRecepcionista,Validators.required),
          fechaNacimientoRecepcionista: new FormControl(this.recepcionista.fechaNacimientoRecepcionista,Validators.required),
          correoRecepcionista: new FormControl(this.recepcionista.correoRecepcionista,Validators.required),
          telefonoRecepcionista: new FormControl(this.recepcionista.telefonoRecepcionista,Validators.required),
          direccionRecepcionista: new FormControl(this.recepcionista.direccionRecepcionista,Validators.required),
          bloqueadoRecepcionista: new FormControl(this.recepcionista.bloqueadoRecepcionista),
        });
      }else{
        this.show=true;
        this.form = new FormGroup({
          nombreRecepcionista: new FormControl(this.recepcionista.nombreRecepcionista,Validators.required),
          CURPRecepcionista: new FormControl(this.recepcionista.CURPRecepcionista,Validators.required),
          fechaNacimientoRecepcionista: new FormControl(this.recepcionista.fechaNacimientoRecepcionista,Validators.required),
          correoRecepcionista: new FormControl(this.recepcionista.correoRecepcionista,Validators.required),
          telefonoRecepcionista: new FormControl(this.recepcionista.telefonoRecepcionista,Validators.required),
          direccionRecepcionista: new FormControl(this.recepcionista.direccionRecepcionista,Validators.required),
          contrasenaRecepcionista: new FormControl(this.recepcionista.contrasenaRecepcionista,Validators.required),
          bloqueadoRecepcionista: new FormControl(this.recepcionista.bloqueadoRecepcionista),
        });
      }

    });
  }
    /* Función para el guardar o actualizar un recepcionista */
  formSubmit() {
    
    this.recepcionista.bloqueadoRecepcionista===false? 0:1;
    console.log(this.recepcionista);
    if (this.idRecepcionista) {
      this.recepcionistaService
        .editarRecepcionista(this.recepcionista, this.idRecepcionista)
        .subscribe(
          (response)=>{
            this._snackBar.open(response, '', {
              duration: 1000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        );
      this.router.navigate(['/dashboard/administracion']);
    } else {
      this.recepcionistaService.guardarRecepcionista(this.recepcionista).subscribe(
        (response)=>{
          this._snackBar.open(response, '', {
            duration: 1000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
           this.form.reset();
           this.recepcionista.bloqueadoRecepcionista=false;
        }
      );
     
    }
   
 
  }
/* Función para obtener la información de un recepcionista */
  obtenerRecepcionista(id: any) {
    this.recepcionistaService.obtenerRecepcionista(id).subscribe(
      (response) => {
        this.recepcionista = response;
        console.log(this.recepcionista);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
