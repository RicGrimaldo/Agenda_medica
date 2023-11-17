require('dotenv').config()
const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const routes = require('./routes')

const app = express()
app.set('port', process.env.PORT || 8080)
const dbConfig = {
  host: process.env.HOST,
  port: 3306,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}

app.use(myconn(mysql, dbConfig, 'single'))
app.use(express.json())

const cors = require('cors')
app.use(cors())
app.use('/api', routes)

app.listen(app.get('port'), () => {
  console.log('Server running on port', app.get('port'))
})
