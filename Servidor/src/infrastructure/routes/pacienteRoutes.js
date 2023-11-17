const express = require('express')
const pacienteRoutes = express.Router()
const pacienteController = require('../controllers/pacienteController')

pacienteRoutes.get('/', pacienteController.obtenerTodos)
pacienteRoutes.post('/registrar', pacienteController.insertar)
pacienteRoutes.get('/obtener/:id', pacienteController.obtener)
pacienteRoutes.put('/actualizar/:id', pacienteController.actualizar)
pacienteRoutes.delete('/eliminar/:id', pacienteController.eliminar)
pacienteRoutes.get('/historialClinico/:id', pacienteController.historialClinico)
pacienteRoutes.get('/historialClinico/:id/descargar', pacienteController.descargarHistorialClinico)
pacienteRoutes.get('/agenda/:id', pacienteController.agenda)

module.exports = pacienteRoutes
