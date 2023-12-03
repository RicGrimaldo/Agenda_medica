const express = require('express')
const informacionGeneral = express.Router()
const informacionGeneralController = require('../controllers/informacionGeneralController')
const AdminCanRequestAllUsersUseCase = require('../../domain/use_cases/admins/AdminCanRequestAllUsers')
const ReceptionistStorage = require('../storages/ReceptionistStorage')
const PatientStorage = require('../storages/PatientStorage')
const MedicStorage = require('../storages/MedicStorage')
const MysqlConnector = require('../db/MysqlConnector')
const connector = new MysqlConnector()

informacionGeneral.get('/usuarios', informacionGeneralController.obtenerUsuarios(
  new AdminCanRequestAllUsersUseCase(new ReceptionistStorage(connector), new PatientStorage(connector), new MedicStorage(connector))
))

module.exports = informacionGeneral
