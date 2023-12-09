const express = require('express')
const pacienteRoutes = express.Router()
const pacienteController = require('../controllers/pacienteController')
const AdminCanGetAllPatientUseCase = require('../../domain/use_cases/admins/AdminCanGetAllPatient')
const PatientStorage = require('../storages/PatientStorage')
const MysqlConnector = require('../db/MysqlConnector')
const AdminCanGetPatientUseCase = require('../../domain/use_cases/admins/AdminCanGetPatient')
const AdminCanCreatePatientUseCase = require('../../domain/use_cases/admins/AdminCanCreatePatient')
const UserStorage = require('../storages/UserStorage')
const AdminCanDeletePatientUseCase = require('../../domain/use_cases/admins/AdminCanDeletePatient')
const AdminCanUpdatePatientUseCase = require('../../domain/use_cases/admins/AdminCanUpdatePatient')
const AppointmentStorage = require('../storages/AppointmentStorage')
const AdminCanGetPatientDiaryUseCase = require('../../domain/use_cases/admins/AdminCanGetPatientDiary')
const AdminCanGetPatientMedicalHistoryUseCase = require('../../domain/use_cases/admins/AdminCanGetPatientMedicalHistory')
const AdminCanDownloadPatientMedicalHistoryUseCase = require('../../domain/use_cases/admins/AdminCanDownloadPatientMedicalHistory')
const connector = new MysqlConnector()

pacienteRoutes.get('/', pacienteController.obtenerTodos(
  new AdminCanGetAllPatientUseCase(new PatientStorage(connector))
))
pacienteRoutes.post('/registrar', pacienteController.insertar(
  new AdminCanCreatePatientUseCase(new UserStorage(connector), new PatientStorage(connector))
))
pacienteRoutes.get('/obtener/:id', pacienteController.obtener(
  new AdminCanGetPatientUseCase(new PatientStorage(connector))
))
pacienteRoutes.put('/actualizar/:id', pacienteController.actualizar(
  new AdminCanUpdatePatientUseCase(new UserStorage(connector), new PatientStorage(connector), new AppointmentStorage(connector))
))
pacienteRoutes.delete('/eliminar/:id', pacienteController.eliminar(
  new AdminCanDeletePatientUseCase(new PatientStorage(connector))
))
pacienteRoutes.get('/historialClinico/:id', pacienteController.historialClinico(
  new AdminCanGetPatientMedicalHistoryUseCase(new AppointmentStorage(connector))
))
pacienteRoutes.get('/historialClinico/:id/descargar', pacienteController.descargarHistorialClinico(
  new AdminCanDownloadPatientMedicalHistoryUseCase(new AppointmentStorage(connector))
))
pacienteRoutes.get('/agenda/:id', pacienteController.agenda(
  new AdminCanGetPatientDiaryUseCase(new AppointmentStorage(connector))
))

module.exports = pacienteRoutes
