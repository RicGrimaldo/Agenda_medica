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

  async createAppointments (patientId, appointmentDtos) {
    if (patientId == null) return []
    for (let appointmentDto of appointmentDtos ){
      try{
        const query = "UPDATE citas SET ? WHERE idCita = ?"
        await this.connector.runQuery(query, appointmentDto, appointmentDto.patientId).then(res => res.results)
        return { status: true, message: 'Citas actualizadas' }
      } catch (error) {
        return { status: false, message: error.sqlMessage }
      }
    }
  }
}
