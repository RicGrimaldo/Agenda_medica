const jwt = require('jsonwebtoken')

// middleware para validar token (rutas protegidas)
const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  const token = authorizationHeader.split(' ')[1].replace(/"/g, '')

  if (!token) return res.status(401).json({ error: 'Acceso denegado' })
  try {
    const verified = jwt.verify(token, 'clavesupermegasecreta')
    req.user = verified
    next() // continuamos
  } catch (error) {
    res.status(400).json({ error: 'token no es válido' })
  }
}
module.exports = verifyToken
