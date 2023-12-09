const SpecialityEntity = require('../../domain/entities/SpecialityEntity')
module.exports = class SpecialityStorage {
  #connector

  constructor (connector) {
    this.#connector = connector
  }

  get connector () {
    return this.#connector
  }

  async getAll () {
    const query = 'SELECT * FROM nimbo.especialidades;'
    const results = await this.connector.runQuery(query).then(res => res.results)
    if (results) {
      return results.map((speciality) => {
        return new SpecialityEntity(
          speciality.idEspecialidad,
          speciality.siglaEspecialidad,
          speciality.nombreEspecialidad
        )
      })
    }
    return undefined
  }
}
