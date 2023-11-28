const express = require('express')
const citaRoutes = express.Router()
const citaController = require('../controllers/citaController')

citaRoutes.post('/crear/:idMedico', citaController.crearCitas)
citaRoutes.put('/reservar/:id', citaController.reservar)
citaRoutes.post('/citasDisponibles', citaController.citasDisponibles)
citaRoutes.get('/citasProgramadas', citaController.citasProgramadas)
citaRoutes.put('/actualizar/:id', citaController.actualizar)

module.exports = citaRoutes
