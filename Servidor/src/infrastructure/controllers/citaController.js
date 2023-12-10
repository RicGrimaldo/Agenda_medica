const dayjs = require('dayjs')

const citaController = {}

/**
 * Crea las citas del medico para un rango de fechas
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
citaController.crearCitas = (medicCanCreateSchedulesUseCase) => {
  return async (req, res) => {
    let statusError = false;
    const idMedico = req.params.idMedico;
    const { fechaInicio, fechaFin, duracionCitas, horaInicio, horaFin, inicioAlmuerzo, finAlmuerzo } = req.body;

    if (!fechaInicio || !fechaFin || !duracionCitas || !horaInicio || !horaFin || !inicioAlmuerzo || !finAlmuerzo) {
      return res.send('Datos incompletos')
    }

    const diasAProgramar = obtenerDiasEntreFechas(fechaInicio, fechaFin)

    if (diasAProgramar.length === 0) return res.send('Datos incorrectos')

    const promises = diasAProgramar.map((diaAProgramar) => {
      const WORK_START = dayjs(diaAProgramar + horaInicio)
      const WORK_END = dayjs(diaAProgramar + horaFin)
      const LUNCH_START = dayjs(diaAProgramar + inicioAlmuerzo)
      const LUNCH_END = dayjs(diaAProgramar + finAlmuerzo)

      return medicCanCreateSchedulesUseCase.createSchedules(idMedico, WORK_START, WORK_END, duracionCitas, LUNCH_START, LUNCH_END)
    })

  await Promise.all(promises)
    .then((statuses) => {
      if (statuses.some((status) => !status)) {
        statusError = true
      }
    })
    .catch((error) => {
      console.error('Error al ejecutar promesas:', error)
      statusError = true
    })
    
    if (statusError) {
      res.json('Error al crear las citas, datos incorrectos')
    } else {
      res.json('Citas creada')
    }
  }
}

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
