const QRCodeGenerator = require('qrcode')
const HTMLtoPDF = require('html-pdf-node')
const mailSystem = require('nodemailer')
const dayjs = require('dayjs')

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
citaController.crearCitas = (medicCanCreateSchedulesUseCase) => {
  return (req, res) => {
    const idMedico = req.params.idMedico
    const { fechaInicio, fechaFin, duracionCitas, horaInicio, horaFin, inicioAlmuerzo, finAlmuerzo } = req.body
    const fechaInicioFormat = new Date(`${fechaInicio}T${horaInicio}`)
    const fechaFinFormat = new Date(`${fechaFin}T${horaFin}`)

    medicCanCreateSchedulesUseCase.createSchedules(idMedico, fechaInicioFormat, fechaFinFormat, duracionCitas, inicioAlmuerzo, finAlmuerzo).then((status) => {
      if (!status) return res.send('Error')
      res.json('Cita creada') 
    })
  }
}
// citaController.crearCitas = (req, res) => {
//   const idMedico = req.params.idMedico
//   const { fechaInicio, fechaFin, duracionCitas, horaInicio, horaFin, inicioAlmuerzo, finAlmuerzo } = req.body
//   if (!fechaInicio || !fechaFin || !duracionCitas || !horaInicio || !horaFin || !inicioAlmuerzo || !finAlmuerzo) return res.status(400).send('Datos incompletos')

//   const diasAProgramar = obtenerDiasEntreFechas(fechaInicio, fechaFin)
//   const citas = []
//   const primerPeriodo = obtenerSeccionesEntreHoras(horaInicio, inicioAlmuerzo, duracionCitas)
//   primerPeriodo.forEach(seccion => {
//     citas.push(seccion)
//   })

//   const segundoPeriodo = obtenerSeccionesEntreHoras(finAlmuerzo, horaFin, duracionCitas)
//   segundoPeriodo.forEach(seccion => {
//     citas.push(seccion)
//   })

//   const fechasProgramadas = []
//   diasAProgramar.forEach(diaAProgramar => {
//     req.getConnection((err, conn) => {
//       if (err) return res.send(err)

//       conn.query('SELECT idCita FROM citas WHERE idMedico =  ? AND fecha = ?',
//         [idMedico, diaAProgramar], (err, rows) => {
//           if (err) return res.send(err)
//           if (rows.length > 0) {
//             fechasProgramadas.push(diaAProgramar)
//           }
//         })
//     })
//   })

//   setTimeout(() => {
//     if (fechasProgramadas.length === 0) {
//       diasAProgramar.forEach(diaAProgramar => {
//         citas.forEach(cita => {
//           const datosCita = {
//             idMedico,
//             fecha: diaAProgramar,
//             horaInicio: cita.horaInicio,
//             horaTermino: cita.horaFin
//           }

//           req.getConnection((err, conn) => {
//             if (err) return res.send(err)

//             conn.query('INSERT INTO citas set ?', [datosCita], (err, rows) => {
//               if (err) return res.send(err)
//             })
//           })
//         })
//       })
//       res.json('Citas generadas')
//     } else {
//       res.json('El/Los dia(s) ' + fechasProgramadas.toString() + ' ya se encuentra(n) programado(s)')
//     }
//   }, 1000)
// }

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

citaController.citasDisponibles = (userCanRequestAvailableSchedulesUseCase) => {
  return (req, res) => {
    const idMedico = req.body.idMedico
    const fechaCita = req.body.fechaCita
    userCanRequestAvailableSchedulesUseCase.getAvailableSchedules(idMedico, fechaCita).then((availableScheduleDtos) => {
      res.status(200).json(availableScheduleDtos.map((scheduleDto) => {
        return {
          idCita: scheduleDto.id,
          horaInicio: dayjs(scheduleDto.startDateTime).format('HH:mm:ss'),
          horaTermino: dayjs(scheduleDto.endDateTime).format('HH:mm:ss'),
          idMedico: scheduleDto.medicId
        }
      }))
    })
  }
}

citaController.citasProgramadas = (userCanRequestIncomingAppointmentsUseCase) => {
  return (req, res) => {
    userCanRequestIncomingAppointmentsUseCase.getIncomingAppointments().then((expAppointmentDtos) => {
      res.status(200).json(expAppointmentDtos.map((expAppointmentDto) => {
        const fecha = new Date(expAppointmentDto.scheduleDto.startDateTime)
        const hora = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        const segundos = fecha.getSeconds().toString().padStart(2, '0');
        return {
          fecha: fecha.toISOString().slice(0,10),
          idMedico: expAppointmentDto.expMedicDto.id,
          idPaciente: expAppointmentDto.patientDto.id,
          horaInicio: hora + ":" + minutos + ":" + segundos,
          modalidad: expAppointmentDto.expMedicDto.specialityDto.id,
          nombreMedico: expAppointmentDto.expMedicDto.name,
          idCita: expAppointmentDto.scheduleDto.id,
          nombrePaciente: expAppointmentDto.patientDto.name,
          consultorioMedico: expAppointmentDto.expMedicDto.office,
          curpPaciente: expAppointmentDto.patientDto.curp
        }
      }))
    })
  }
}

citaController.actualizar = (userCanUpdateAnAppointmentUseCase) => {
  return (req, res) => {
    const appointmentId = req.params.id
    const patientId = req.body.idPaciente
    const modalidad = req.body.modalidad
    const notas = req.body.notasConsultas
    userCanUpdateAnAppointmentUseCase.updateAppointment(appointmentId, patientId, modalidad, notas).then((status) => {
      if (!status) return res.send('Error')
      res.json('Cita actualizada')
    })
  }
}

module.exports = citaController
