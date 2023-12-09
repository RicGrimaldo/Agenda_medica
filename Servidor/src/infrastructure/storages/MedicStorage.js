const MedicEntity = require('../../domain/entities/MedicEntity')

module.exports = class MedicStorage {
  #connector

  constructor (connector) {
    this.#connector = connector
  }

  get connector () {
    return this.#connector
  }

  async getAll () {
    const query = 'SELECT * FROM nimbo.medicos ORDER BY nombreMedico ASC;'
    const results = await this.connector.runQuery(query).then(res => res.results)
    if (results) {
      return results.map((medic) => {
        return new MedicEntity(
          medic.idMedico,
          medic.nombreMedico,
          medic.CURPMedico,
          medic.fechaNacimientoMedico,
          medic.correoMedico,
          medic.telefonoMedico,
          medic.direccionMedico,
          medic.especialidadMedico,
          medic.consultorioMedico,
          medic.cedulaProfesionalMedico,
          medic.contrasenaMedico,
          medic.bloqueadoMedico,
          []
        )
      })
    }
    return undefined
  }

  async getById (id) {
    const query = `SELECT * FROM nimbo.medicos WHERE medicos.idMedico = "${id}" LIMIT 1;`
    const results = await this.connector.runQuery(query).then(res => res.results)
    if (results && results[0]) {
      const medic = results[0]
      return new MedicEntity(
        medic.idMedico,
        medic.nombreMedico,
        medic.CURPMedico,
        medic.fechaNacimientoMedico,
        medic.correoMedico,
        medic.telefonoMedico,
        medic.direccionMedico,
        medic.especialidadMedico,
        medic.consultorioMedico,
        medic.cedulaProfesionalMedico,
        medic.contrasenaMedico,
        medic.bloqueadoMedico,
        []
      )
    }
    return undefined
  }

  async create (medic) {
    try {
      const query = 'INSERT INTO medicos SET ?'
      await this.connector.runQuery(query, medic).then(res => res.results)
      return { status: true, message: '¡Medico agregado!' }
    } catch (error) {
      return { status: false, message: error.sqlMessage }
    }
  }
}
