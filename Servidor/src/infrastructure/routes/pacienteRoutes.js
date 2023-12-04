const express = require('express')
const pacienteRoutes = express.Router()
const pacienteController = require('../controllers/pacienteController')
const AdminCanGetAllPatientUseCase = require('../../domain/use_cases/admins/AdminCanGetAllPatient')
const PatientStorage = require('../storages/PatientStorage')
const MysqlConnector = require('../db/MysqlConnector')
const connector = new MysqlConnector()

pacienteRoutes.get('/', pacienteController.obtenerTodos(
  new AdminCanGetAllPatientUseCase(new PatientStorage(connector))
))
pacienteRoutes.post('/registrar', pacienteController.insertar)
pacienteRoutes.get('/obtener/:id', pacienteController.obtener)
pacienteRoutes.put('/actualizar/:id', pacienteController.actualizar)
pacienteRoutes.delete('/eliminar/:id', pacienteController.eliminar)
pacienteRoutes.get('/historialClinico/:id', pacienteController.historialClinico)
pacienteRoutes.get('/historialClinico/:id/descargar', pacienteController.descargarHistorialClinico)
pacienteRoutes.get('/agenda/:id', pacienteController.agenda)

module.exports = pacienteRoutes
