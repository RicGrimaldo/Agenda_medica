const AppointmentMedicDto = require('../../domain/dtos/AppointmentMedicDto')

module.exports = class AppointmentStorage {
  #connector

  constructor (connector) {
    this.#connector = connector
  }

  get connector () {
    return this.#connector
  }

  async releaseByPatientId (id) {
    try {
      const query = "UPDATE citas JOIN pacientes ON citas.idPaciente = pacientes.idPaciente SET citas.idPaciente = null, citas.modalidad = null WHERE pacientes.bloqueadoPaciente = 1 AND pacientes.idPaciente = ? AND CONCAT(citas.fecha, ' ', citas.horaInicio) >= NOW();"
      await this.connector.runQuery(query, id).then(res => res.results)
      return { status: true, message: 'Citas liberadas' }
    } catch (error) {
      return { status: false, message: error.sqlMessage }
    }
  }

  async releaseByMedicId (id) {
    try {
      const query = "UPDATE citas JOIN medicos ON citas.idMedico = medicos.idMedico SET citas.idPaciente = null, citas.modalidad = null WHERE medicos.bloqueadoMedico = 1 AND medicos.idMedico = ? AND CONCAT(citas.fecha, ' ', citas.horaInicio) >= NOW();"
      await this.connector.runQuery(query, id).then(res => res.results)
      return { status: true, message: 'Citas liberadas' }
    } catch (error) {
      return { status: false, message: error.sqlMessage }
    }
  }

  async findAllByMedicId (id) {
    const query = 'SELECT citas.idCita, pacientes.nombrePaciente, citas.fecha, citas.horaInicio, citas.horaTermino FROM medicos JOIN citas join pacientes WHERE medicos.idMedico = citas.idMedico AND pacientes.idPaciente = citas.idPaciente AND medicos.idMedico= ?;'
    const results = await this.connector.runQuery(query, id).then(res => res.results)
    if (results) {
      return results.map((appointment) => {
        return new AppointmentMedicDto(
          appointment.idCita,
          appointment.nombrePaciente,
          appointment.fecha,
          appointment.horaInicio,
          appointment.horaTermino
        )
      })
    }
    return undefined
  }
}
