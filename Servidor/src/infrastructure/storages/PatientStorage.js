const PatientEntity = require('../../domain/entities/PatientEntity')
const MysqlConnector = require('../db/MysqlConnector')

module.exports = class PatientStorage {
  #connector

  constructor () {
    this.#connector = new MysqlConnector()
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
}
