const informacionGeneralController = {}

informacionGeneralController.obtenerUsuarios = (adminCanRequestAllUsersUseCase) => {
  return (req, res) => {
    adminCanRequestAllUsersUseCase.getAllUsers().then((getAllUsersResDto) => {
      res.status(200).json({
        recepcionistas: getAllUsersResDto.receptionistDtos.map((receptionistDto) => {
          return {
            idRecepcionista: receptionistDto.id,
            nombreRecepcionista: receptionistDto.name,
            CURPRecepcionista: receptionistDto.curp,
            fechaNacimientoRecepcionista: receptionistDto.birthDate,
            correoRecepcionista: receptionistDto.email,
            telefonoRecepcionista: receptionistDto.phone,
            direccionRecepcionista: receptionistDto.address,
            bloqueadoRecepcionista: receptionistDto.blocked
          }
        }),
        medicos: getAllUsersResDto.medicDtos.map((medicDto) => {
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
        }),
        pacientes: getAllUsersResDto.patientDtos.map((patientDto) => {
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
        })
      })
    })
  }
}

module.exports = informacionGeneralController
