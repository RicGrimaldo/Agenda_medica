const medicoController = {}
const crypto = require('crypto')

medicoController.obtenerTodos = (adminCanGetAllMedicUseCase) => {
  return (req, res) => {
    adminCanGetAllMedicUseCase.getAll().then((getAllMedicResDto) => {
      res.status(200).json(getAllMedicResDto.dtos.map((medicDto) => {
        return {
          idMedico: medicDto.id,
          nombreMedico: medicDto.name,
          CURPMedico: medicDto.curp,
          fechaNacimientoMedico: medicDto.birthDate,
          correoMedico: medicDto.email,
          telefonoMedico: medicDto.phone,
          direccionMedico: medicDto.address,
          especialidadMedico: medicDto.specialityId,
          consultorioMedico: medicDto.office,
          cedulaProfesionalMedico: medicDto.professionalId,
          bloqueadoMedico: medicDto.blocked
        }
      }))
    })
  }
}

medicoController.obtener = (adminCanGetMedicUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanGetMedicUseCase.get(id).then((getMedicResDto) => {
      if (getMedicResDto.status) {
        res.status(200).json({
          idMedico: getMedicResDto.dto.id,
          nombreMedico: getMedicResDto.dto.name,
          CURPMedico: getMedicResDto.dto.curp,
          fechaNacimientoMedico: getMedicResDto.dto.birthDate,
          correoMedico: getMedicResDto.dto.email,
          telefonoMedico: getMedicResDto.dto.phone,
          direccionMedico: getMedicResDto.dto.address,
          especialidadMedico: getMedicResDto.dto.specialityId,
          consultorioMedico: getMedicResDto.dto.office,
          cedulaProfesionalMedico: getMedicResDto.dto.professionalId,
          bloqueadoMedico: getMedicResDto.dto.blocked
        })
      } else {
        res.status(404).send(getMedicResDto.message)
      }
    })
  }
}

medicoController.actualizar = (adminCanUpdateMedicUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanUpdateMedicUseCase.update(id, req.body).then((updateMedicResDto) => {
      res.json(updateMedicResDto.message)
    })
  }
}

medicoController.eliminar = (adminCanDeleteMedicUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanDeleteMedicUseCase.delete(id).then((deleteMedicResDto) => {
      res.json(deleteMedicResDto.message)
    })
  }
}

medicoController.insertar = (adminCanCreateMedicUseCase) => {
  return (req, res) => {
    req.body.contrasenaMedico = generarHashContraseña(req.body.contrasenaMedico)
    adminCanCreateMedicUseCase.create(req.body).then((createMedicResDto) => {
      res.json(createMedicResDto.message)
    })
  }
}
medicoController.obtenerEspecialidades = (adminCanGetAllSpecialityUseCase) => {
  return (req, res) => {
    adminCanGetAllSpecialityUseCase.getAll().then((getMedicDiaryResDto) => {
      res.status(200).json(getMedicDiaryResDto.dtos.map((medicDiaryDto) => {
        return {
          idEspecialidad: medicDiaryDto.id,
          siglaEspecialidad: medicDiaryDto.acronym,
          nombreEspecialidad: medicDiaryDto.name
        }
      }))
    })
  }
}

medicoController.agenda = (adminCanGetMedicDiaryUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanGetMedicDiaryUseCase.getMedicDiary(id).then((getMedicDiaryResDto) => {
      for (let i = 0; i < getMedicDiaryResDto.dtos.length; i++) {
        const date = getMedicDiaryResDto.dtos[i].fecha
        const formattedDate = date.toISOString().substring(0, 10)
        const start = formattedDate.concat('T', getMedicDiaryResDto.dtos[i].horaInicio)
        const end = formattedDate.concat('T', getMedicDiaryResDto.dtos[i].horaTermino)
        getMedicDiaryResDto.dtos[i].start = start
        getMedicDiaryResDto.dtos[i].end = end
      }
      res.json(getMedicDiaryResDto.dtos)
    })
  }
}
medicoController.agendaDisponible = (adminCanGetAvailableMedicDiaryUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanGetAvailableMedicDiaryUseCase.getAvailableMedicDiary(id).then((getAvailableMedicDiaryResDto) => {
      for (let i = 0; i < getAvailableMedicDiaryResDto.dtos.length; i++) {
        const date = getAvailableMedicDiaryResDto.dtos[i].fecha
        const formattedDate = date.toISOString().substring(0, 10)
        const start = formattedDate.concat('T', getAvailableMedicDiaryResDto.dtos[i].horaInicio)
        const end = formattedDate.concat('T', getAvailableMedicDiaryResDto.dtos[i].horaTermino)
        getAvailableMedicDiaryResDto.dtos[i].start = start
        getAvailableMedicDiaryResDto.dtos[i].end = end
      }
      res.json(getAvailableMedicDiaryResDto.dtos)
    })
  }
}

/**
 *Se obtienen las citas programadas del médico
 * @param {*} req Contiene la petición del usuario
 * @param {*} res Contiene la respuesta que se enviara a la peticion
 */
medicoController.citasProgramadas = (req, res) => {
  const id = req.params.id
  req.getConnection((err, conn) => {
    if (err) return res.send(err)

    conn.query("SELECT citas.fecha, medicos.idMedico, pacientes.idPaciente, citas.horaInicio, citas.horaTermino, citas.modalidad, medicos.nombreMedico, medicos.consultorioMedico, citas.idCita, pacientes.nombrePaciente, pacientes.CURPPaciente FROM medicos JOIN citas JOIN pacientes WHERE citas.idPaciente=pacientes.idPaciente AND medicos.idMedico=citas.idMedico AND citas.notasConsultas IS NULL AND CONCAT(citas.fecha, ' ', citas.horaInicio) >= NOW() AND medicos.idMedico=?", [id], (err, rows) => {
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
 * Encripta una contraseña utilizando el algoritmo SHA256.
 * @param {string} password - La contraseña del usuario.
 * @return {string} El hash de la contraseña en formato hexadecimal.
 */
function generarHashContraseña (password) {
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  return hash
}

module.exports = medicoController
