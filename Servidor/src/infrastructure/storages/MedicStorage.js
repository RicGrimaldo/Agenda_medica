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
}
