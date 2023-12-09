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

pacienteController.historialClinico = (adminCanGetPatientMedicalHistoryUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanGetPatientMedicalHistoryUseCase.getPatientMedicalHistory(id).then((getPatientMedicalHistoryResDto) => {
      for (let i = 0; i < getPatientMedicalHistoryResDto.length; i++) {
        const date = new Date(getPatientMedicalHistoryResDto[i].fecha)
        getPatientMedicalHistoryResDto[i].fecha = date.toISOString().slice(0, 10)
      }
      res.json(getPatientMedicalHistoryResDto.dtos)
    })
  }
}

pacienteController.descargarHistorialClinico = (adminCanDownloadPatientMedicalHistoryUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanDownloadPatientMedicalHistoryUseCase.downloadMedicalHistory(id).then((downloadPatientMedicalHistoryRes) => {
      if (!downloadPatientMedicalHistoryRes.status) return res.send(downloadPatientMedicalHistoryRes.message)
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      res.setHeader('Content-Disposition', 'attachment; filename=Historial clinico.xlsx')
      downloadPatientMedicalHistoryRes.book.xlsx.write(res).then(() => {
        res.status(200).end()
      })
    })
  }
}

pacienteController.agenda = (adminCanGetPatientDiaryUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanGetPatientDiaryUseCase.getPatientDiary(id).then((getPatientDiaryResDto) => {
      for (let i = 0; i < getPatientDiaryResDto.dtos.length; i++) {
        const date = getPatientDiaryResDto.dtos[i].fecha
        const formattedDate = date.toISOString().substring(0, 10)
        const start = formattedDate.concat('T', getPatientDiaryResDto.dtos[i].horaInicio)
        const end = formattedDate.concat('T', getPatientDiaryResDto.dtos[i].horaTermino)
        getPatientDiaryResDto.dtos[i].start = start
        getPatientDiaryResDto.dtos[i].end = end
      }
      res.json(getPatientDiaryResDto.dtos)
    })
  }
}

function generarHashContraseña (password) {
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  return hash
}

module.exports = pacienteController
