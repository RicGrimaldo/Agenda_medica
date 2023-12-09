const recepcionistaController = {}
const crypto = require('crypto')

recepcionistaController.obtenerTodos = (adminCanGetAllReceptionistUseCase) => {
  return (req, res) => {
    res.status(200).json(adminCanGetAllReceptionistUseCase.dtos.map((receptionistDto) => {
      return {
        idPaciente: receptionistDto.id,
        nombrePaciente: receptionistDto.name,
        CURPPaciente: receptionistDto.curp,
        fechaNacimientoPaciente: receptionistDto.birthDate,
        correoPaciente: receptionistDto.email,
        telefonoPaciente: receptionistDto.phone,
        direccionPaciente: receptionistDto.address,
        bloqueadoPaciente: receptionistDto.blocked
      }
    }))
  }
}

recepcionistaController.obtener = (adminCanGetReceptionistUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanGetReceptionistUseCase.get(id).then((getReceptionistResDto) => {
      if (getReceptionistResDto.status) {
        const date = new Date(getReceptionistResDto.dto.birthDate)
        getReceptionistResDto.dto.birthDate = date.toISOString().slice(0, 10)
        res.status(200).json({
          idRecepcionista: getReceptionistResDto.dto.id,
          nombreRecepcionista: getReceptionistResDto.dto.name,
          CURPRecepcionista: getReceptionistResDto.dto.curp,
          fechaNacimientoRecepcionista: getReceptionistResDto.dto.birthDate,
          correoRecepcionista: getReceptionistResDto.dto.email,
          telefonoRecepcionista: getReceptionistResDto.dto.phone,
          direccionRecepcionista: getReceptionistResDto.dto.address,
          bloqueadoRecepcionista: getReceptionistResDto.dto.blocked
        })
      } else {
        res.status(404).send(getReceptionistResDto.message)
      }
    })
  }
}

recepcionistaController.actualizar = (adminCanUpdateReceptionistUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanUpdateReceptionistUseCase.update(id, req.body, req.body.correoRecepcionista).then((updateReceptionistResDto) => {
      res.json(updateReceptionistResDto.message)
    })
  }
}

recepcionistaController.eliminar = (adminCanDeleteReceptionistUseCase) => {
  return (req, res) => {
    const id = req.params.id
    adminCanDeleteReceptionistUseCase.delete(id).then((deleteReceptionistResDto) => {
      res.json(deleteReceptionistResDto.message)
    })
  }
}

recepcionistaController.insertar = (adminCanCreateReceptionistUseCase) => {
  return (req, res) => {
    req.body.contrasenaRecepcionista = generarHashContraseña(req.body.contrasenaRecepcionista)
    adminCanCreateReceptionistUseCase.create(req.body, req.body.correoRecepcionista).then((createReceptionistResDto) => {
      res.json(createReceptionistResDto.message)
    })
  }
}

function generarHashContraseña (password) {
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  return hash
}

module.exports = recepcionistaController
