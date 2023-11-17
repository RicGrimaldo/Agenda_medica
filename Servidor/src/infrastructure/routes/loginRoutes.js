const express = require('express')
const login = express.Router()
const loginController = require('../controllers/loginController')

login.post('/auth', loginController.login)

module.exports = login
