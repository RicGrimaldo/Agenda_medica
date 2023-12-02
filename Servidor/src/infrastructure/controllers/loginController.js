require('dotenv').config()
const jwt = require('jsonwebtoken')
const loginController = {}

loginController.login = (encryptionHelper, userCanLogInUseCase) => {
  return (req, res) => {
    const email = req.body.email_usuario
    const password = encryptionHelper.encryptString(req.body.password_usuario)

    userCanLogInUseCase.logIn(email, password).then((logInResDto) => {
      if (!logInResDto.status) return res.status(401).send('Unauthorized')
      const PAYLOAD = { check: true }
      const SECURITY_TOKEN = process.env.SECURITY_TOKEN
      const OPTIONS = { expiresIn: '7d' }
      const token = jwt.sign(PAYLOAD, SECURITY_TOKEN, OPTIONS)
      res.json({
        id: logInResDto.userId,
        rol: logInResDto.roleId,
        token
      })
    })
  }
}

module.exports = loginController
