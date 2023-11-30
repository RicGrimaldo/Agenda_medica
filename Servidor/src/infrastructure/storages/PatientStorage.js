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
    return results
  }

  async findByEmail (email) {
    const query = `SELECT * FROM nimbo.pacientes WHERE pacientes.correoPaciente = "${email}" LIMIT 1;`
    const results = await this.connector.runQuery(query).then(res => res.results)
    return results
  }
}
