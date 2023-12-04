const PatientEntity = require('../../domain/entities/PatientEntity')

module.exports = class PatientStorage {
  #connector

  constructor (connector) {
    this.#connector = connector
  }

  get connector () {
    return this.#connector
  }

  async getById (id) {
    const query = `SELECT * FROM nimbo.pacientes WHERE pacientes.idPaciente = "${id}" LIMIT 1;`
    const results = await this.connector.runQuery(query).then(res => res.results)
    if (results && results[0]) {
      const patient = results[0]
      return new PatientEntity(
        patient.idPaciente,
        patient.nombrePaciente,
        patient.CURPPaciente,
        patient.fechaNacimientoPaciente,
        patient.correoPaciente,
        patient.telefonoPaciente,
        patient.direccionPaciente,
        patient.edadPaciente,
        patient.generoPaciente,
        patient.contrasenaPaciente,
        patient.bloqueadoPaciente,
        []
      )
    }
    return undefined
  }

  async getAll (isLocked = false) {
    const blockStatus = isLocked ? 1 : 0
    const query = 'SELECT * FROM nimbo.pacientes WHERE bloqueadoPaciente = ? ORDER BY nombrePaciente ASC;'
    const results = await this.connector.runQuery(query, [blockStatus]).then(res => res.results)
    if (results) {
      return results.map((patient) => {
        return new PatientEntity(
          patient.idPaciente,
          patient.nombrePaciente,
          patient.CURPPaciente,
          patient.fechaNacimientoPaciente,
          patient.correoPaciente,
          patient.telefonoPaciente,
          patient.direccionPaciente,
          patient.edadPaciente,
          patient.generoPaciente,
          patient.contrasenaPaciente,
          patient.bloqueadoPaciente,
          []
        )
      })
    }
    return undefined
  }
}
