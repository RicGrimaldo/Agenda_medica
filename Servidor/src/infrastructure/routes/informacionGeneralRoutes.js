const express = require('express')
const informacionGeneral = express.Router()
const informacionGeneralController = require('../controllers/informacionGeneralController')

informacionGeneral.get('/usuarios', informacionGeneralController.obtenerUsuarios)

module.exports = informacionGeneral
