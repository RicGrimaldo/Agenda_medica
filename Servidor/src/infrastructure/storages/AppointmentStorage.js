const AppointmentDto = require("../../domain/dtos/AppointmentDto")

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
    let ids = []
    if (patientId == null) return []
    for (let appointmentDto of appointmentDtos ){
      try{
        const query = "UPDATE citas SET " +
          "idPaciente = ?, " +
          "idCita = ?, " +
          "modalidad = ?, " +
          "notasConsultas = ? " +
          "WHERE idCita = ?;";

        const values = [
          appointmentDto.patientId,
          appointmentDto.scheduleId,
          appointmentDto.modality,
          appointmentDto.notes,
          appointmentDto.scheduleId
        ];

        await this.connector.runQuery(query, values).then(res => res.results);
        ids.push(appointmentDto.id)
      } catch (error) {
        return { status: false, message: error.sqlMessage }
      }
    }
    return ids
  }

  async getIncoming (){
    const query = 'SELECT * FROM nimbo.citas WHERE idPaciente IS NOT NULL;'
    const results = await this.connector.runQuery(query).then(res => res.results)
    if (results) {
      return results.map((appointment) => {
        return new AppointmentDto(
          undefined,
          appointment.idPaciente,
          appointment.idCita,
          appointment.modalidad,
          appointment.notasConsultas,
          appointment.idMedico
        )
      })
    }
    return undefined
  }
}
