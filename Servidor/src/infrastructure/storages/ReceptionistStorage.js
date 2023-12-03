const ReceptionistDto = require('../../domain/dtos/ReceptionistDto')

module.exports = class ReceptionistStorage {
  #connector

  constructor (connector) {
    this.#connector = connector
  }

  get connector () {
    return this.#connector
  }

  async getAll () {
    const query = 'SELECT * FROM nimbo.recepcionistas ORDER BY nombreRecepcionista ASC;'
    const results = await this.connector.runQuery(query).then(res => res.results)
    if (results) {
      return results.map((receptionist) => {
        return new ReceptionistDto(
          receptionist.idRecepcionista,
          receptionist.nombreRecepcionista,
          receptionist.CURPRecepcionista,
          receptionist.fechaNacimientoRecepcionista,
          receptionist.correoRecepcionista,
          receptionist.telefonoRecepcionista,
          receptionist.direccionRecepcionista,
          receptionist.contrasenaRecepcionista,
          receptionist.bloqueadoRecepcionista
        )
      })
    }
    return undefined
  }
}
