const express = require('express')
const routes = express.Router()

const cors = require('cors')
routes.use(cors())

const verifyToken = require('./src/infrastructure/controllers/authController')

const ROUTE_SPECS = [
  { requireSrc: './src/infrastructure/routes/informacionGeneralRoutes', validateToken: true, baseRoute: '/informacion' },
  { requireSrc: './src/infrastructure/routes/recepcionistaRoutes', validateToken: true, baseRoute: '/recepcionistas' },
  { requireSrc: './src/infrastructure/routes/medicoRoutes', validateToken: true, baseRoute: '/medicos' },
  { requireSrc: './src/infrastructure/routes/pacienteRoutes', validateToken: true, baseRoute: '/pacientes' },
  { requireSrc: './src/infrastructure/routes/citaRoutes', validateToken: true, baseRoute: '/citas' },
  { requireSrc: './src/infrastructure/routes/loginRoutes', validateToken: false, baseRoute: '/login' }
]
ROUTE_SPECS.forEach(spec => {
  const REQUIRED_ROUTES = require(spec.requireSrc)
  if (spec.validateToken) {
    routes.use(spec.baseRoute, verifyToken, REQUIRED_ROUTES)
  } else {
    routes.use(spec.baseRoute, REQUIRED_ROUTES)
  }
})

module.exports = routes
