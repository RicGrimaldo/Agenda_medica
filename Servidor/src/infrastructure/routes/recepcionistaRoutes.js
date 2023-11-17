const express = require('express')
const recepcionistaRoutes = express.Router()
const recepcionistaController = require('../controllers/recepcionistaController')

recepcionistaRoutes.get('/', recepcionistaController.obtenerTodos)
recepcionistaRoutes.post('/registrar', recepcionistaController.insertar)
recepcionistaRoutes.get('/obtener/:id', recepcionistaController.obtener)
recepcionistaRoutes.put('/actualizar/:id', recepcionistaController.actualizar)
recepcionistaRoutes.delete('/eliminar/:id', recepcionistaController.eliminar)

module.exports = recepcionistaRoutes
