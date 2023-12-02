const express = require('express')
const login = express.Router()
const loginController = require('../controllers/loginController')
const EncryptionHelper = require('../helpers/EncryptionHelper')
const UserCanLogInUseCase = require('../../domain/use_cases/users/UserCanLogIn')
const UserStorage = require('../storages/UserStorage')
const MysqlConnector = require('../db/MysqlConnector')
const connector = new MysqlConnector()

login.post('/auth', loginController.login(
  new EncryptionHelper(),
  new UserCanLogInUseCase(new UserStorage(connector))
))

module.exports = login
