
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {
	URL = "http://localhost:8080";
	constructor(
		private http: HttpClient,
	) { }

	obtenerTodosUsuarios(): Observable<any> {
		return this.http.get(`${this.URL}/api/informacion/usuarios`);
	}


	//Recepcionistas
	obtenerRecepcionistas(): Observable<any> {
		return this.http.get(`${this.URL}/api/recepcionistas`);
	}

	guardarRecepcionista($recepcionista: any): Observable<any> {
		let data = Object.assign({}, $recepcionista);
		console.log(data);
		return this.http.post(`${this.URL}/api/recepcionistas/registrar`, data);
	}

	obtenerRecepcionista($id: any): Observable<any> {
		return this.http.get(`${this.URL}/api/recepcionistas/obtener/${$id}`);
	}

	editarRecepcionista($recepcionista: any, $id: any): Observable<any> {
		let data = Object.assign({}, $recepcionista);
		return this.http.put(`${this.URL}/api/recepcionistas/actualizar/${$id}`, data);
	}

	eliminarRecepcionista($id: any): Observable<any> {
		return this.http.delete(`${this.URL}/api/recepcionistas/eliminar/${$id}`);
	}


	/* Medicos */
	obtenerMedicos(): Observable<any> {
		return this.http.get(`${this.URL}/api/medicos`);
	}
	
	guardarMedico($medico: any): Observable<any> {
		let data = Object.assign({}, $medico);
		console.log(data);
		return this.http.post(`${this.URL}/api/medicos/registrar`, data);
	}

	obtenerMedico($id: any): Observable<any> {
		return this.http.get(`${this.URL}/api/medicos/obtener/${$id}`);
	}

	editarMedico($medico: any, $id: any): Observable<any> {
		let data = Object.assign({}, $medico);
		return this.http.put(`${this.URL}/api/medicos/actualizar/${$id}`, data);
	}

	eliminarMedico($id: any): Observable<any> {
		return this.http.delete(`${this.URL}/api/eliminar/${$id}`);
	}

	/* Especialidades REVIZAR */
	obtenerEspecialidades(): Observable<any> {
		return this.http.get(`${this.URL}/api/especialidades`);
	}


	/* Pacientes */
	obtenerPacientes(): Observable<any> {
		return this.http.get(`${this.URL}/api/pacientes`);
	}

	guardarPaciente($paciente: any): Observable<any> {
		let data = Object.assign({}, $paciente);
		console.log(data);
		return this.http.post(`${this.URL}/api/pacientes/registrar`, data);
	}

	obtenerPaciente($id: any): Observable<any> {
		return this.http.get(`${this.URL}/api/pacientes/obtener/${$id}`);
	}

	editarPaciente($paciente: any, $id: any): Observable<any> {
		let data = Object.assign({}, $paciente);
		return this.http.put(`${this.URL}/api/pacientes/actualizar/${$id}`, data);
	}

	eliminarPaciente($id: any): Observable<any> {
		return this.http.delete(`${this.URL}/api/pacientes/eliminar/${$id}`);
	}


	/*Citas */
	crearCitas($id: any, $datos: any): Observable<any> {
		let data = Object.assign({}, $datos);
		console.log(data);
		return this.http.post(`${this.URL}/api/citas/crear/${$id}`, data);
	}
	editarCita($datos: any, $id: any): Observable<any> {
		let data = Object.assign({}, $datos);
		console.log(data);
		return this.http.put(`${this.URL}/api/citas/${$id}`, data);
	}

	citasDisponibles($datos: any): Observable<any> {
		let data = Object.assign({}, $datos);
		console.log(data);
		return this.http.post(`${this.URL}/api/citasDisponibles`, data);
	}


	

}
