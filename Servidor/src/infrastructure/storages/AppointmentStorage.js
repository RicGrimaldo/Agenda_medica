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
    return await this.connector.runQuery(query, id).then(res => res.results)
  }

  async findAllByPatientId (id) {
    const query = 'SELECT citas.idCita, medicos.nombreMedico, citas.fecha, citas.horaInicio, citas.horaTermino FROM medicos JOIN citas join pacientes WHERE medicos.idMedico = citas.idMedico AND pacientes.idPaciente = citas.idPaciente AND pacientes.idPaciente= ?'
    return await this.connector.runQuery(query, id).then(res => res.results)
  }

  async findMedicalHistoryByPatientId (id) {
    const query = 'SELECT citas.fecha, citas.horaInicio, citas.modalidad, citas.notasConsultas, medicos.nombreMedico, pacientes.nombrePaciente, medicos.consultorioMedico,citas.idCita FROM medicos JOIN citas JOIN pacientes WHERE citas.idPaciente=pacientes.idPaciente AND medicos.idMedico=citas.idMedico AND pacientes.idPaciente= ? ORDER BY citas.fecha DESC'
    return await this.connector.runQuery(query, id).then(res => res.results)
  }

  async findExcelMedicalHistoryByPatientId (id) {
    const query = 'SELECT citas.fecha, citas.horaInicio, citas.modalidad, citas.notasConsultas, medicos.nombreMedico, medicos.consultorioMedico,citas.idCita FROM medicos JOIN citas JOIN pacientes WHERE citas.idPaciente=pacientes.idPaciente AND medicos.idMedico=citas.idMedico AND pacientes.idPaciente= ? ORDER BY citas.idCita DESC'
    return await this.connector.runQuery(query, id).then(res => res.results)
  }

  async findAvailableByMedicId (id) {
    const query = "SELECT citas.idCita, citas.fecha, citas.horaInicio, citas.horaTermino FROM medicos JOIN citas WHERE medicos.idMedico = citas.idMedico AND citas.idMedico=? AND citas.idPaciente IS NULL AND CONCAT(citas.fecha, ' ', citas.horaInicio) >= NOW()"
    return await this.connector.runQuery(query, id).then(res => res.results)
  }

  async findReservedByMedicId (id) {
    const query = "SELECT citas.fecha, medicos.idMedico, pacientes.idPaciente, citas.horaInicio, citas.horaTermino, citas.modalidad, medicos.nombreMedico, medicos.consultorioMedico, citas.idCita, pacientes.nombrePaciente, pacientes.CURPPaciente FROM medicos JOIN citas JOIN pacientes WHERE citas.idPaciente=pacientes.idPaciente AND medicos.idMedico=citas.idMedico AND citas.notasConsultas IS NULL AND CONCAT(citas.fecha, ' ', citas.horaInicio) >= NOW() AND medicos.idMedico=?"
    return await this.connector.runQuery(query, id).then(res => res.results)
  }
}
