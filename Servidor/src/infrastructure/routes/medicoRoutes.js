const express = require('express')
const medicoRoutes = express.Router()
const medicoController = require('../controllers/medicoController')

medicoRoutes.get('/', medicoController.obtenerTodos)
medicoRoutes.post('/registrar', medicoController.insertar)
medicoRoutes.get('/obtener/:id', medicoController.obtener)
medicoRoutes.put('/actualizar/:id', medicoController.actualizar)
medicoRoutes.delete('/eliminar/:id', medicoController.eliminar)
medicoRoutes.get('/agenda/:id', medicoController.agenda)
medicoRoutes.get('/agendaDisponible/:id', medicoController.agendaDisponible)
medicoRoutes.get('/especialidades', medicoController.obtenerEspecialidades)
medicoRoutes.get('/citasProgramadas/:id', medicoController.citasProgramadas)

module.exports = medicoRoutes
