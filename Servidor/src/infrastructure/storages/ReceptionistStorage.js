const ReceptionistDto = require('../../domain/dtos/ReceptionistDto')

module.exports = class ReceptionistStorage {
  #connector

  constructor (connector) {
    this.#connector = connector
  }

  get connector () {
    return this.#connector
  }

  async create (receptionist) {
    try {
      const query = 'INSERT INTO recepcionistas SET ?'
      await this.connector.runQuery(query, receptionist).then(res => res.results)
      return { status: true, message: '¡Recepcionista agregado!' }
    } catch (error) {
      return { status: false, message: error.sqlMessage }
    }
  }

  async update (id, receptionist) {
    try {
      const query = 'UPDATE recepcionistas SET ? WHERE idRecepcionista = ?'
      await this.connector.runQuery(query, [receptionist, id]).then(res => res.results)
      return { status: true, message: '¡Recepcionista actualizado!' }
    } catch (error) {
      return { status: false, message: error.sqlMessage }
    }
  }

  async getById (id) {
    const query = `SELECT * FROM nimbo.recepcionistas WHERE recepcionistas.idRecepcionista = "${id}" LIMIT 1;`
    const results = await this.connector.runQuery(query).then(res => res.results)
    if (results && results[0]) {
      const receptionist = results[0]
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
    }
    return undefined
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

  async delete (id) {
    const query = 'DELETE FROM recepcionistas WHERE idRecepcionista = ?'
    const results = await this.connector.runQuery(query, id).then(res => res.results)
    if (results) {
      return true
    }
    return undefined
  }
}
