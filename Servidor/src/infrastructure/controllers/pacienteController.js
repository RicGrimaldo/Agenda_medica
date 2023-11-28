const pacienteController = {}
const ExcelJS = require('exceljs')
const crypto = require('crypto')

/**
 * Devuelve la información de todos los pacientes en la base de datos
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
pacienteController.obtenerTodos = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) return res.send(err)

    conn.query('SELECT idPaciente,nombrePaciente,CURPPaciente,fechaNacimientoPaciente,correoPaciente,telefonoPaciente,direccionPaciente,generoPaciente,bloqueadoPaciente FROM pacientes WHERE bloqueadoPaciente=0 ORDER BY nombrePaciente', (err, rows) => {
      if (err) return res.send(err)
      res.json(rows)
    })
  })
}

/**
 * Devuelve la información de un paciente de la base de datos
 * apartir de su id
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
pacienteController.obtener = (req, res) => {
  const id = req.params.id

  req.getConnection((err, conn) => {
    if (err) return res.send(err)

    conn.query('SELECT idPaciente,nombrePaciente,CURPPaciente,fechaNacimientoPaciente,correoPaciente,telefonoPaciente,direccionPaciente,edadPaciente,generoPaciente,bloqueadoPaciente FROM pacientes WHERE idPaciente = ?', [id], (err, rows) => {
      if (err) return res.send(err)

      if (rows.length > 0) {
        const paciente = rows[0]
        const fecha = new Date(paciente.fechaNacimientoPaciente)
        paciente.fechaNacimientoPaciente = fecha.toISOString().slice(0, 10)

        res.json(paciente)
      } else {
        res.status(404).send('No se pudo encontrar al paciente con ID ' + id)
      }
    })
  })
}

/**
 * Actualiza la información de un paciente de la base de datos
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */

pacienteController.actualizar = (req, res) => {
  const id = req.params.id
  const updatedPaciente = req.body

  req.getConnection((err, conn) => {
    if (err) return res.send(err)

    const correoPaciente = updatedPaciente.correoPaciente // Nuevo correo del paciente a actualizar

    // Verificar si el correo ya existe en otros usuarios, excluyendo el paciente actualizado
    conn.query(
      'SELECT COUNT(*) AS count FROM (SELECT correoPaciente FROM pacientes UNION SELECT correoMedico FROM medicos UNION SELECT correoRecepcionista FROM recepcionistas) AS usuarios WHERE correoPaciente = ? AND correoPaciente != (SELECT correoPaciente FROM pacientes WHERE idPaciente = ?)',
      [correoPaciente, id],
      (err, result) => {
        if (err) return res.send(err)

        const count = result[0].count

        if (count > 0) {
          // El correo ya existe en otro usuario, enviar una respuesta indicando el problema
          return res.json('Correo inválido. El correo ya está registrado en otro usuario.')
        } else {
          conn.query('UPDATE pacientes SET ? WHERE idPaciente = ?', [updatedPaciente, id], (err, result) => {
            if (err) return res.send(err)

            if (updatedPaciente.bloqueadoPaciente) {
              conn.query("UPDATE citas JOIN pacientes ON citas.idPaciente = pacientes.idPaciente SET citas.idPaciente = null, citas.modalidad = null WHERE pacientes.bloqueadoPaciente = 1 AND pacientes.idPaciente = ? AND CONCAT(citas.fecha, ' ', citas.horaInicio) >= NOW();", [id], (err, result) => {
                if (err) return res.send(err)
              })
            }

            res.json('Paciente actualizado.')
          })
        }
      }
    )
  })
}

/**
 * Elimina la información de un paciente de la base de datos
 * apartir de su id
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
pacienteController.eliminar = (req, res) => {
  const id = req.params.id

  req.getConnection((err, conn) => {
    if (err) return res.send(err)

    conn.query('DELETE FROM pacientes WHERE idPaciente = ?', [id], (err, rows) => {
      if (err) return res.send(err)
      res.json('paciente eliminado!')
    })
  })
}

/**
 * Agrega un paciente a la base de datos
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
pacienteController.insertar = (req, res) => {
  req.getConnection(async (err, conn) => {
    if (err) return res.send(err)

    const correoPaciente = req.body.correoPaciente // Correo del paciente a crear

    // Verificar si el correo ya existe en otros usuarios
    conn.query(
      'SELECT COUNT(*) AS count FROM ( SELECT correoPaciente FROM pacientes UNION SELECT correoMedico FROM medicos UNION SELECT correoRecepcionista FROM recepcionistas) AS usuarios WHERE correoPaciente = ?',
      [correoPaciente],
      async (err, result) => {
        if (err) return res.send(err)

        const count = result[0].count

        if (count > 0) {
          // El correo ya existe en otro usuario, enviar una respuesta indicando el problema
          return res.json('Correo inválido. El correo ya está registrado en otro usuario.')
        } else {
          try {
            req.body.contrasenaPaciente = await generarHashContraseña(req.body.contrasenaPaciente)

            conn.query('INSERT INTO pacientes SET ?', [req.body], (err, rows) => {
              if (err) return res.send(err)

              res.json('¡Paciente agregado!')
            })
          } catch (error) {
            return res.send(error)
          }
        }
      }
    )
  })
}

/**
 * Obtiene el historial clínico del paciente
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */

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

/**
 * Envia un archio xlss con el historial clinico
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
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
/**
 * Obtiene las citas atendidas y por atender de un paciente
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */

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

/**
 * Encripta una contraseña utilizando el algoritmo SHA256.
 * @param {string} password - La contraseña del usuario.
 * @return {string} El hash de la contraseña en formato hexadecimal.
 */
function generarHashContraseña (password) {
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  return hash
}

module.exports = pacienteController
