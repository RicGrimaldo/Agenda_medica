require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  const token = authorizationHeader.split(' ')[1].replace(/"/g, '')

  if (!token) return res.status(401).json({ error: 'Acceso denegado' })
  try {
    const verified = jwt.verify(token, process.env.SECURITY_TOKEN)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ error: 'Acceso denegado' })
  }
}

module.exports = verifyToken
