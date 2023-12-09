const express = require('express')
const recepcionistaRoutes = express.Router()
const recepcionistaController = require('../controllers/recepcionistaController')
const ReceptionistStorage = require('../storages/ReceptionistStorage')
const AdminCanGetAllReceptionistUseCase = require('../../domain/use_cases/admins/AdminCanGetAllReceptionist')
const AdminCanCreateReceptionistUseCase = require('../../domain/use_cases/admins/AdminCanCreateReceptionist')
const UserStorage = require('../storages/UserStorage')
const AdminCanGetReceptionistUseCase = require('../../domain/use_cases/admins/AdminCanGetReceptionist')
const AdminCanUpdateReceptionistUseCase = require('../../domain/use_cases/admins/AdminCanUpdateReceptionist')
const AdminCanDeleteReceptionistUseCase = require('../../domain/use_cases/admins/AdminCanDeleteReceptionist')
const MysqlConnector = require('../db/MysqlConnector')
const connector = new MysqlConnector()

recepcionistaRoutes.get('/', recepcionistaController.obtenerTodos(
  new AdminCanGetAllReceptionistUseCase(new ReceptionistStorage(connector))
))
recepcionistaRoutes.post('/registrar', recepcionistaController.insertar(
  new AdminCanCreateReceptionistUseCase(new UserStorage(connector), new ReceptionistStorage(connector))
))
recepcionistaRoutes.get('/obtener/:id', recepcionistaController.obtener(
  new AdminCanGetReceptionistUseCase(new ReceptionistStorage(connector))
))
recepcionistaRoutes.put('/actualizar/:id', recepcionistaController.actualizar(
  new AdminCanUpdateReceptionistUseCase(new UserStorage(connector), new ReceptionistStorage(connector))
))
recepcionistaRoutes.delete('/eliminar/:id', recepcionistaController.eliminar(
  new AdminCanDeleteReceptionistUseCase(new ReceptionistStorage(connector))
))

module.exports = recepcionistaRoutes
