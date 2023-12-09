const express = require('express')
const medicoRoutes = express.Router()
const medicoController = require('../controllers/medicoController')
const AdminCanGetAllMedicUseCase = require('../../domain/use_cases/admins/AdminCanGetAllMedic')
const AdminCanGetMedicUseCase = require('../../domain/use_cases/admins/AdminCanGetMedic')
const AdminCanUpdateMedicUseCase = require('../../domain/use_cases/admins/AdminCanUpdateMedic')
const AdminCanDeleteMedicUseCase = require('../../domain/use_cases/admins/AdminCanDeleteMedic')
const AdminCanCreateMedicUseCase = require('../../domain/use_cases/admins/AdminCanCreateMedic')
const AdminCanGetAllSpecialityUseCase = require('../../domain/use_cases/admins/AdminCanGetAllSpeciality')
const AdminCanGetMedicDiaryUseCase = require('../../domain/use_cases/admins/AdminCanGetMedicDiary')
const AdminCanGetAvailableMedicDiaryUseCase = require('../../domain/use_cases/admins/AdminCanGetAvailableMedicDiary')

const UserStorage = require('../storages/UserStorage')
const MysqlConnector = require('../db/MysqlConnector')
const AppointmentStorage = require('../storages/AppointmentStorage')
const connector = new MysqlConnector()
const MedicStorage = require('../storages/MedicStorage')
const SpecialityStorage = require('../storages/SpecialityStorage')

medicoRoutes.get('/', medicoController.obtenerTodos(
  new AdminCanGetAllMedicUseCase(new MedicStorage(connector))
))

medicoRoutes.post('/registrar', medicoController.insertar(
  new AdminCanCreateMedicUseCase(new UserStorage(connector), new MedicStorage(connector))
))

medicoRoutes.get('/obtener/:id', medicoController.obtener(
  new AdminCanGetMedicUseCase(new MedicStorage(connector))
))

medicoRoutes.put('/actualizar/:id', medicoController.actualizar(
  new AdminCanUpdateMedicUseCase(new UserStorage(connector), new MedicStorage(connector), new AppointmentStorage(connector))
))

medicoRoutes.delete('/eliminar/:id', medicoController.eliminar(
  new AdminCanDeleteMedicUseCase(new MedicStorage(connector))
))

medicoRoutes.get('/especialidades', medicoController.obtenerEspecialidades(
  new AdminCanGetAllSpecialityUseCase(new SpecialityStorage(connector))
)
)

medicoRoutes.get('/agenda/:id', medicoController.agenda(
  new AdminCanGetMedicDiaryUseCase(new AppointmentStorage(connector))
)
)
medicoRoutes.get('/agendaDisponible/:id', medicoController.agendaDisponible(
  new AdminCanGetAvailableMedicDiaryUseCase(new AppointmentStorage(connector))
)
)
/* medicoRoutes.get('/agendaDisponible/:id', medicoController.agendaDisponible) */

medicoRoutes.get('/citasProgramadas/:id', medicoController.citasProgramadas)

module.exports = medicoRoutes
