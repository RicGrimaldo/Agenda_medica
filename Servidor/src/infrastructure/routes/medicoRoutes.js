const express = require('express')
const medicoRoutes = express.Router()
const medicoController = require('../controllers/medicoController')
const AdminCanGetAllMedicUseCase = require('../../domain/use_cases/admins/AdminCanGetAllMedic')
const AdminCanGetMedicUseCase = require('../../domain/use_cases/admins/AdminCanGetMedic')
const AdminCanUpdateMedicUseCase = require('../../domain/use_cases/admins/AdminCanUpdateMedic')
const AdminCanDeleteMedicUseCase = require('../../domain/use_cases/admins/AdminCanDeleteMedic')
const AdminCanCreateMedicUseCase = require('../../domain/use_cases/admins/AdminCanCreateMedic')
const UserStorage = require('../storages/UserStorage')
const MysqlConnector = require('../db/MysqlConnector')
const AppointmentStorage = require('../storages/AppointmentStorage')
const connector = new MysqlConnector()
const MedicStorage = require('../storages/MedicStorage')

medicoRoutes.get('/', medicoController.obtenerTodos(
  new AdminCanGetAllMedicUseCase(new MedicStorage(connector))
))
medicoRoutes.post('/registrar', medicoController.insertar)

medicoRoutes.get('/obtener/:id', medicoController.obtener(
  new AdminCanGetMedicUseCase(new MedicStorage(connector))
))

medicoRoutes.put('/actualizar/:id', medicoController.actualizar)
medicoRoutes.delete('/eliminar/:id', medicoController.eliminar)
medicoRoutes.get('/agenda/:id', medicoController.agenda)
medicoRoutes.get('/agendaDisponible/:id', medicoController.agendaDisponible)
medicoRoutes.get('/especialidades', medicoController.obtenerEspecialidades)
medicoRoutes.get('/citasProgramadas/:id', medicoController.citasProgramadas)

module.exports = medicoRoutes
