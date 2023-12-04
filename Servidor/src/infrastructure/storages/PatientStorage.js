const PatientEntity = require('../../domain/entities/PatientEntity')

module.exports = class PatientStorage {
  #connector

  constructor (connector) {
    this.#connector = connector
  }

  get connector () {
    return this.#connector
  }

  async create (patient) {
    try {
      const query = 'INSERT INTO pacientes SET ?'
      await this.connector.runQuery(query, patient).then(res => res.results)
      return { status: true, message: '¡Paciente agregado!' }
    } catch (error) {
      return { status: false, message: error.sqlMessage }
    }
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

  async getAll () {
    const query = 'SELECT * FROM nimbo.pacientes WHERE bloqueadoPaciente = 0 ORDER BY nombrePaciente ASC;'
    const results = await this.connector.runQuery(query).then(res => res.results)
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
