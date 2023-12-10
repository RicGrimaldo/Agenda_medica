const express = require('express')
const citaRoutes = express.Router()
const citaController = require('../controllers/citaController')
const UserCanCreateAppointmentsUseCase = require('../../domain/use_cases/users/UserCanCreateAppointments')
const PatientStorage = require('../storages/PatientStorage')
const ScheduleStorage = require('../storages/ScheduleStorage')
const MysqlConnector = require('../db/MysqlConnector')
const AppointmentStorage = require('../storages/AppointmentStorage')
const MedicStorage = require('../storages/MedicStorage')
const MailerHelper = require('../helpers/MailerHelper')
const NewAppointmentMail = require('../mails/NewAppointmentMail')
const QrHelper = require('../helpers/QrHelper')
const UserCanRequestAvailableSchedulesUseCase = require('../../domain/use_cases/users/UserCanRequestAvailableSchedules')
const UserCanRequestIncomingAppointmentsUseCase = require('../../domain/use_cases/users/UserCanRequestIncomingAppointments')
const UserCanUpdateAnAppointmentUseCase = require('../../domain/use_cases/users/UserCanUpdateAnAppointment')
const connector = new MysqlConnector()

citaRoutes.post('/crear/:idMedico', citaController.crearCitas)
citaRoutes.put('/reservar/:id', citaController.reservar(
    new UserCanCreateAppointmentsUseCase(
        new PatientStorage(connector), 
        new ScheduleStorage(connector), 
        new AppointmentStorage(connector), 
        new MedicStorage(connector)
    ),
    new MailerHelper(),
    new NewAppointmentMail(),
    new QrHelper()
))

citaRoutes.post('/citasDisponibles', citaController.citasDisponibles(
    new UserCanRequestAvailableSchedulesUseCase(
        new ScheduleStorage(connector)
    )
))
citaRoutes.get('/citasProgramadas', citaController.citasProgramadas(
    new UserCanRequestIncomingAppointmentsUseCase(
        new PatientStorage(connector),
        new ScheduleStorage(connector),
        new AppointmentStorage(connector),
        new MedicStorage(connector)
    )
))
citaRoutes.put('/actualizar/:id', citaController.actualizar(
    new UserCanUpdateAnAppointmentUseCase(
        new AppointmentStorage(connector)
    )
))

module.exports = citaRoutes
