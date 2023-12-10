const QRCodeGenerator = require('qrcode')
const HTMLtoPDF = require('html-pdf-node')
const mailSystem = require('nodemailer')

const mailTransporter = mailSystem.createTransport({
  host: 'smtp-mail.outlook.com', // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: 'SSLv3'
  },
  auth: {
    user: 'NimboApi@outlook.com',
    pass: 'contrasenasegura123'
  }
})

const citaController = {}

/**
 * Crea las citas del medico para un rango de fechas
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
citaController.crearCitas = (req, res) => {
  const idMedico = req.params.idMedico
  const { fechaInicio, fechaFin, duracionCitas, horaInicio, horaFin, inicioAlmuerzo, finAlmuerzo } = req.body
  if (!fechaInicio || !fechaFin || !duracionCitas || !horaInicio || !horaFin || !inicioAlmuerzo || !finAlmuerzo) return res.status(400).send('Datos incompletos')

  const diasAProgramar = obtenerDiasEntreFechas(fechaInicio, fechaFin)
  const citas = []
  const primerPeriodo = obtenerSeccionesEntreHoras(horaInicio, inicioAlmuerzo, duracionCitas)
  primerPeriodo.forEach(seccion => {
    citas.push(seccion)
  })

  const segundoPeriodo = obtenerSeccionesEntreHoras(finAlmuerzo, horaFin, duracionCitas)
  segundoPeriodo.forEach(seccion => {
    citas.push(seccion)
  })

  const fechasProgramadas = []
  diasAProgramar.forEach(diaAProgramar => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err)

      conn.query('SELECT idCita FROM citas WHERE idMedico =  ? AND fecha = ?',
        [idMedico, diaAProgramar], (err, rows) => {
          if (err) return res.send(err)
          if (rows.length > 0) {
            fechasProgramadas.push(diaAProgramar)
          }
        })
    })
  })

  setTimeout(() => {
    if (fechasProgramadas.length === 0) {
      diasAProgramar.forEach(diaAProgramar => {
        citas.forEach(cita => {
          const datosCita = {
            idMedico,
            fecha: diaAProgramar,
            horaInicio: cita.horaInicio,
            horaTermino: cita.horaFin
          }

          req.getConnection((err, conn) => {
            if (err) return res.send(err)

            conn.query('INSERT INTO citas set ?', [datosCita], (err, rows) => {
              if (err) return res.send(err)
            })
          })
        })
      })
      res.json('Citas generadas')
    } else {
      res.json('El/Los dia(s) ' + fechasProgramadas.toString() + ' ya se encuentra(n) programado(s)')
    }
  }, 1000)
}

/**
 * Regresa un arreglo con las secciones de un intervalo de horas
 * @param {string} horaInicio hora inicial del intervalo a seccionar
 * @param {string} horaFin hora final del intervalo a seccionar
 * @param {string} tiempoSeccion Tiempo a seccionar en entre las horas
 */
function obtenerSeccionesEntreHoras (horaInicio, horaFin, tiempoSeccion) {
  let horaInicioSeccion = horaInicio
  const secciones = []

  while (horaInicioSeccion < horaFin) {
    const [horasString, minutosString] = horaInicioSeccion.split(':')
    let horas = parseInt(horasString)
    let minutos = parseInt(minutosString)

    minutos += parseInt(tiempoSeccion)
    if (minutos >= 60) {
      horas++
      minutos -= 60
    }

    // Formateamos la hora para poder compararlas
    const horasStringFinSeccion = horas.toString().padStart(2, '0')
    const minutosStringFinSeccion = minutos.toString().padStart(2, '0')
    const horaFinSeccion = `${horasStringFinSeccion}:${minutosStringFinSeccion}`

    if (horaFinSeccion <= horaFin) {
      const seccion = {
        horaInicio: horaInicioSeccion,
        horaFin: horaFinSeccion
      }
      secciones.push(seccion)
      horaInicioSeccion = horaFinSeccion
    }
  }
  return secciones
}

/**
 * Regresa un arreglo de los dias con formado YYYY-MM-DD a partir de un intervalo de fechas
 * @param {DATE} fechaInicio Fecha inicial del intervalo de fechas a obtener
 * @param {Date} fechaFin Fecha final del intervalo de fechas a obtener
 */
function obtenerDiasEntreFechas (fechaInicio, fechaFin) {
  const dias = []

  // Corregimos los problemas de la conversion de fecha
  const fechaActual = new Date()
  const [anioFechaInicio, mesFechaInicio, diaFechaInicio] = fechaInicio.split('-')
  fechaActual.setFullYear(anioFechaInicio)
  fechaActual.setMonth(parseInt(mesFechaInicio) - 1)
  fechaActual.setDate(diaFechaInicio)

  // Corregimos los problemas de la conversion de fecha
  const fechaLimite = new Date()
  const [anioFechaFin, mesFechaFin, diaFechaFin] = fechaFin.split('-')
  fechaLimite.setFullYear(anioFechaFin)
  fechaLimite.setMonth(parseInt(mesFechaFin) - 1)
  fechaLimite.setDate(diaFechaFin)

  while (fechaActual <= fechaLimite) {
    // Formateamos la fecha
    const anio = fechaActual.getFullYear()
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0')
    const dia = fechaActual.getDate().toString().padStart(2, '0')
    dias.push(`${anio}-${mes}-${dia}`)
    fechaActual.setDate(fechaActual.getDate() + 1)
  }
  return dias
}

/**
 * Cambia el id del paciente de una cita en la base de datos
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
citaController.reservar = (userCanCreateAppointmentsUseCase, mailHelper, newAppointmentMail, qrHelper) => {
  return async (req, res) => {
    const idCita = req.params.id
    const idPaciente = req.body.idPaciente
    const modalidad = req.body.modalidad
    const fullUrl = req.protocol + '://' + req.get('host') + "/login"
    console.log("Url: " + fullUrl)

    try {
      const createAppointmentResDto = await userCanCreateAppointmentsUseCase.createAppointment(idPaciente, idCita, modalidad)

      if (!createAppointmentResDto.status) {
        return res.status(401).send('Unauthorized')
      }

      let qr = await qrHelper.getQr(fullUrl)
      console.log("Exp: ")
      console.log(createAppointmentResDto.expAppointmentDto)
      let template = newAppointmentMail.getTemplate(createAppointmentResDto.expAppointmentDto, qr)
      let correoPaciente = createAppointmentResDto.expAppointmentDto.patientDto.email
      
      await mailHelper.sendHtmlMail(
        'Reservación de cita', 
        correoPaciente, 
        template,
        'datos_cita.pdf'
      )

      res.json(`Cita con id ${idCita} reservada.`)
    } catch (error) {
      console.error("Error al reservar la cita:", error)
      res.status(500).send("Internal Server Error")
    }
  }
}


/**
 * Envia un correo con la información de la cita reservada
 * @param {*} BDconnection conexion a la base de datos
 * @param {*} idPaciente id del paciente a buscar el correo
 * @param {*} idMedico id del medico a buscar la información
 * @param {*} idCita id de la cita  a buscar la información
 */
async function notificarPorCorreo (BDconnection, idPaciente, idMedico, idCita) {
  const correoPaciente = await obtenerCorreoPaciente(idPaciente, BDconnection)
  const datosMedico = await obtenerDatosCorreoMedico(idMedico, BDconnection)
  const datosCita = await obtenerDatosCorreoCita(idCita, BDconnection)

  if (correoPaciente && datosMedico && datosCita) {
    datosCita.fecha = new Date(datosCita.fecha).toISOString().slice(0, 10)

    const conexionSistemaCorreos = await mailTransporter.verify()
    if (conexionSistemaCorreos) {
      const codigoQR = await QRCodeGenerator.toDataURL('Gracias por reservar con Nimbo, nos vemos pronto', {
        errorCorrectionLevel: 'H'
      })

      const htmlTemplate = `<body> <h1 class="text-center" style="text-align: center;">Datos de reservación de cita</h1> <table class="center" style="border: 1px solid black;border-radius: 10px;text-align: center;margin-left: auto;margin-right: auto;"> <tr> <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Fecha</th> <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Hora de inicio</th> <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Hora de fin</th> <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Nombre del medico</th> <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Especialidad</th> <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Consultorio del medico</th> <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Modalidad</th> </tr><tr> <td style="border: 1px solid black;border-radius: 10px;text-align: center;">${datosCita.fecha}</td><td style="border: 1px solid black;border-radius: 10px;text-align: center;">${datosCita.horaInicio}</td><td style="border: 1px solid black;border-radius: 10px;text-align: center;">${datosCita.horaTermino}</td><td style="border: 1px solid black;border-radius: 10px;text-align: center;">${datosMedico.nombreMedico}</td><td style="border: 1px solid black;border-radius: 10px;text-align: center;">${datosMedico.nombreEspecialidad}</td><td style="border: 1px solid black;border-radius: 10px;text-align: center;">${datosMedico.consultorioMedico}</td><td style="border: 1px solid black;border-radius: 10px;text-align: center;">${datosCita.modalidad}</td></tr></table><div style="text-align: center;"><img src="${codigoQR}"></div></body>`

      const options = { format: 'A4' }
      const file = { content: htmlTemplate }
      const PDF = await HTMLtoPDF.generatePdf(file, options)

      const message = {
        from: 'NimboApi@outlook.com',
        to: correoPaciente,
        subject: 'Message test',
        html: htmlTemplate,
        attachments: [
          {
            filename: 'datos_cita.pdf',
            content: PDF
          }
        ]
      }
      mailTransporter.sendMail(message, (err, info) => {
        console.info('info: ' + info.response)
        console.info('err: ' + err)
      })
    }
  }
}

/**
 * Devuelve el correo del paciente de la base de datos
 * @param {*} idPaciente id del paciente a buscar el correo
 * @param {*} BDconnection conexion a la base de datos
 * @return el correo del paciente dentro de la base de datos o null si no lo encuentra
 */
function obtenerCorreoPaciente (idPaciente, BDconnection) {
  const resultado = new Promise((resolve, reject) => {
    BDconnection.query('SELECT correoPaciente FROM `pacientes` WHERE idPaciente = ?', [idPaciente], (err, rows) => {
      if (err) return null
      if (rows.length > 0) {
        resolve(rows[0].correoPaciente)
      } else {
        resolve(null)
      }
    })
  })

  return resultado
}

/**
 * Devuelve el nombre, especialidad y consultorio del medico de la base de datos
 * @param {*} idMedico id del medico a buscar la información
 * @param {*} BDconnection conexion a la base de datos
 * @return nombre, especialidad y consultorio  del medico dentro de la base de datos o null si no lo encuentra
 */
function obtenerDatosCorreoMedico (idMedico, BDconnection) {
  const resultado = new Promise((resolve, reject) => {
    BDconnection.query('SELECT medicos.nombreMedico, medicos.consultorioMedico, especialidades.nombreEspecialidad FROM medicos JOIN especialidades WHERE medicos.especialidadMedico = especialidades.idEspecialidad AND medicos.idMedico =  ?', [idMedico], (err, rows) => {
      if (err) return null
      if (rows.length > 0) {
        resolve(rows[0])
      } else {
        resolve(null)
      }
    })
  })

  return resultado
}

/**
 * Devuelve la fecha, hora de inicio, hora de fin de una cita en la base de datos
 * @param {*} idCita id de la cita a buscar la fecha
 * @param {*} BDconnection conexion a la base de datos
 * @return fecha, hora de inicio, hora de fin de una cita dentro de la base de datos o null si no lo encuentra
 */
function obtenerDatosCorreoCita (idCita, BDconnection) {
  const resultado = new Promise((resolve, reject) => {
    BDconnection.query('SELECT fecha, horaInicio, horaTermino, modalidad FROM `citas` WHERE idCita  = ?', [idCita], (err, rows) => {
      if (err) return null
      if (rows.length > 0) {
        resolve(rows[0])
      } else {
        resolve(null)
      }
    })
  })

  return resultado
}

/**
 * Devuelve todas las citas disponibles a partir del id del medico y una fecha
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
citaController.citasDisponibles = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err)

    conn.query("SELECT * FROM citas WHERE idMedico= ? AND fecha=? AND idPaciente IS NULL AND CONCAT(citas.fecha, ' ', citas.horaInicio) >= NOW()", [req.body.idMedico, req.body.fechaCita], (err, rows) => {
      if (err) return res.send(err)
      res.json(rows)
    })
  })
}

/**
 * Regresa todas la información de las citas ya programadas con un paciente y que aun no han sucedido
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
citaController.citasProgramadas = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err)

    conn.query("SELECT citas.fecha, medicos.idMedico, pacientes.idPaciente, citas.horaInicio, citas.modalidad, medicos.nombreMedico, medicos.consultorioMedico, citas.idCita, pacientes.nombrePaciente, pacientes.CURPPaciente FROM medicos JOIN citas JOIN pacientes WHERE citas.idPaciente=pacientes.idPaciente AND medicos.idMedico=citas.idMedico AND citas.notasConsultas IS NULL AND CONCAT(citas.fecha, ' ', citas.horaInicio) >= NOW()", (err, rows) => {
      if (err) return res.send(err)

      for (let i = 0; i < rows.length; i++) {
        const fecha = new Date(rows[i].fecha)
        rows[i].fecha = fecha.toISOString().slice(0, 10)
      }
      res.json(rows)
    })
  })
}
/**
 * Actualiza la información de una cita en la base de datos
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
citaController.actualizar = (req, res) => {
  const id = req.params.id
  const updated = req.body

  req.getConnection((err, conn) => {
    if (err) return res.send(err)

    conn.query('UPDATE citas SET ? WHERE idCita = ?', [updated, id], (err, result) => {
      if (err) return res.send(err)
      res.json(`Cita con id ${id} actualizada.`)
    })
  })
}

module.exports = citaController
