const pacienteController = {}
const ExcelJS = require('exceljs')
const crypto = require('crypto')

pacienteController.obtenerTodos = (adminCanGetAllPatientUseCase) => {
  return (req, res) => {
    adminCanGetAllPatientUseCase.getAll().then((getAllPatientResDto) => {
      res.status(200).json(getAllPatientResDto.dtos.map((patientDto) => {
        return {
          idPaciente: patientDto.id,
          nombrePaciente: patientDto.name,
          CURPPaciente: patientDto.curp,
          fechaNacimientoPaciente: patientDto.birthDate,
          correoPaciente: patientDto.email,
          telefonoPaciente: patientDto.phone,
          direccionPaciente: patientDto.address,
          edadPaciente: patientDto.age,
          generoPaciente: patientDto.genre,
          bloqueadoPaciente: patientDto.blocked
        }
      }))
    })
  }
}

pacienteController.obtener = (adminCanGetPatientUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanGetPatientUseCase.get(id).then((getPatientResDto) => {
      if (getPatientResDto.status) {
        res.status(200).json({
          idPaciente: getPatientResDto.dto.id,
          nombrePaciente: getPatientResDto.dto.name,
          CURPPaciente: getPatientResDto.dto.curp,
          fechaNacimientoPaciente: getPatientResDto.dto.birthDate,
          correoPaciente: getPatientResDto.dto.email,
          telefonoPaciente: getPatientResDto.dto.phone,
          direccionPaciente: getPatientResDto.dto.address,
          edadPaciente: getPatientResDto.dto.age,
          generoPaciente: getPatientResDto.dto.genre,
          bloqueadoPaciente: getPatientResDto.dto.blocked
        })
      } else {
        res.status(404).send(getPatientResDto.message)
      }
    })
  }
}

pacienteController.actualizar = (adminCanUpdatePatientUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanUpdatePatientUseCase.update(id, req.body).then((updatePatientResDto) => {
      res.json(updatePatientResDto.message)
    })
  }
}

pacienteController.eliminar = (adminCanDeletePatientUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanDeletePatientUseCase.delete(id).then((deletePatientResDto) => {
      res.json(deletePatientResDto.message)
    })
  }
}

pacienteController.insertar = (adminCanCreatePatientUseCase) => {
  return (req, res) => {
    req.body.contrasenaPaciente = generarHashContraseña(req.body.contrasenaPaciente)
    adminCanCreatePatientUseCase.create(req.body).then((createPatientResDto) => {
      res.json(createPatientResDto.message)
    })
  }
}

pacienteController.historialClinico = (req, res) => {
  const id = req.params.id

  req.getConnection((err, conn) => {
    if (err) return res.send(err)

    conn.query('SELECT citas.fecha, citas.horaInicio, citas.modalidad, citas.notasConsultas, medicos.nombreMedico, pacientes.nombrePaciente, medicos.consultorioMedico,citas.idCita FROM medicos JOIN citas JOIN pacientes WHERE citas.idPaciente=pacientes.idPaciente AND medicos.idMedico=citas.idMedico AND pacientes.idPaciente= ? ORDER BY citas.fecha DESC', [id], (err, rows) => {
      if (err) return res.send(err)

      for (let i = 0; i < rows.length; i++) {
        const fecha = new Date(rows[i].fecha)
        rows[i].fecha = fecha.toISOString().slice(0, 10)
      }
      res.json(rows)
    })
  })
}

pacienteController.descargarHistorialClinico = (req, res) => {
  const id = req.params.id

  req.getConnection((err, conn) => {
    if (err) return res.send(err)

    conn.query('SELECT citas.fecha, citas.horaInicio, citas.modalidad, citas.notasConsultas, medicos.nombreMedico, medicos.consultorioMedico,citas.idCita FROM medicos JOIN citas JOIN pacientes WHERE citas.idPaciente=pacientes.idPaciente AND medicos.idMedico=citas.idMedico AND pacientes.idPaciente= ? ORDER BY citas.idCita DESC', [id], async (err, rows) => {
      if (err) return res.send(err)

      // Inicilizamos el libro y hoja de excel
      const libro = new ExcelJS.Workbook()
      const hoja = libro.addWorksheet('Historial clinico')

      // Colocamos los encabezados de las columnas
      hoja.columns = [
        { header: 'Fecha', key: 'fecha', width: 20 },
        { header: 'Hora', key: 'horaInicio', width: 20 },
        { header: 'Medico', key: 'nombreMedico', width: 35 },
        { header: 'Consultorio', key: 'consultorioMedico', width: 20 },
        { header: 'Modalidad', key: 'modalidad', width: 20 },
        { header: 'Notas de consulta', key: 'notasConsultas', width: 60 }
      ]

      // Le ingresamos los filtros a las columnas
      hoja.autoFilter = 'A1:F1'

      for (let i = 0; i < rows.length; i++) {
        const fecha = new Date(rows[i].fecha)
        rows[i].fecha = fecha.toISOString().slice(0, 10)

        // Agregamos los datos a la hoja de excell
        hoja.addRow(rows[i]).commit()
      }

      // Preparamos los headers de la petición para enviar un archivo
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      res.setHeader('Content-Disposition', 'attachment; filename=Historial clinico.xlsx')
      // Enviamos el archivo
      libro.xlsx.write(res).then(() => {
        res.status(200).end()
      })
    })
  })
}

pacienteController.agenda = (req, res) => {
  const id = req.params.id

  req.getConnection((err, conn) => {
    if (err) return res.send(err)

    conn.query('SELECT citas.idCita, medicos.nombreMedico, citas.fecha, citas.horaInicio, citas.horaTermino FROM medicos JOIN citas join pacientes WHERE medicos.idMedico = citas.idMedico AND pacientes.idPaciente = citas.idPaciente AND pacientes.idPaciente= ?', [id], (err, rows) => {
      if (err) return res.send(err)
      for (let i = 0; i < rows.length; i++) {
        const fecha = rows[i].fecha
        const fechaFormateada = fecha.toISOString().substring(0, 10) // "2023-05-07"
        const start = fechaFormateada.concat('T', rows[i].horaInicio) // "2023-05-07T12:36:00"
        const end = fechaFormateada.concat('T', rows[i].horaTermino) // "2023-05-07T12:36:00"
        rows[i].start = start
        rows[i].end = end
      }
      res.json(rows)
    })
  })
}

function generarHashContraseña (password) {
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  return hash
}

module.exports = pacienteController
