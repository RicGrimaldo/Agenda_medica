const SpecialityDto = require('../../domain/dtos/SpecialityDto')
const ExpMedicDto = require('../../domain/dtos/expanded/ExpMedicDto')
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

  async getExpandedById (id) {
    const query =   `SELECT medicos.*, especialidades.*
                    FROM nimbo.medicos
                    INNER JOIN nimbo.especialidades ON medicos.especialidadMedico = especialidades.idEspecialidad
                    WHERE medicos.idMedico = "${id}"
                    LIMIT 1;`
    const results = await this.connector.runQuery(query).then(res => res.results)
    if (results && results[0]) {
      const medic = results[0]
      return new ExpMedicDto(
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
        new SpecialityDto(
          medic.idEspecialidad,
          medic.siglaEspecialidad,
          medic.nombreEspecialidad
        )
      )
    }
    return undefined
  }
}
