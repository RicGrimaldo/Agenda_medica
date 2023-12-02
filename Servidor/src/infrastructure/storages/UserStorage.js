const Roles = require('../../domain/constants/Roles')
const UserDto = require('../../domain/dtos/UserDto')

module.exports = class UserStorage {
  #connector

  constructor (connector) {
    this.#connector = connector
  }

  get connector () {
    return this.#connector
  }

  async findByEmail (email) {
    const FIND_BY_EMAIL_GATEWAYS = [
      this.#findPatientByEmail,
      this.#findMedicByEmail,
      this.#findAdminByEmail,
      this.#findReceptionistByEmail
    ]

    let userDto
    for (const findByEmailGateway of FIND_BY_EMAIL_GATEWAYS) {
      userDto = await findByEmailGateway(email, this.connector)
      if (userDto) break
    }
    return userDto
  }

  async #findPatientByEmail (email, connector) {
    const query = `
      SELECT idPaciente, correoPaciente, contrasenaPaciente
      FROM nimbo.pacientes
      WHERE BINARY pacientes.correoPaciente = "${email}"
      LIMIT 1;
    `
    const results = await connector.runQuery(query).then(res => res.results)
    if (results && results[0]) {
      const patient = results[0]
      return new UserDto(patient.idPaciente, patient.correoPaciente, patient.contrasenaPaciente, Roles.PATIENT)
    }
    return undefined
  }

  async #findMedicByEmail (email, connector) {
    const query = `
      SELECT idMedico, correoMedico, contrasenaMedico
      FROM nimbo.medicos
      WHERE BINARY medicos.correoMedico = "${email}"
      LIMIT 1;
    `
    const results = await connector.runQuery(query).then(res => res.results)
    if (results && results[0]) {
      const medic = results[0]
      return new UserDto(medic.idMedico, medic.correoMedico, medic.contrasenaMedico, Roles.MEDIC)
    }
    return undefined
  }

  async #findAdminByEmail (email, connector) {
    const query = `
      SELECT idAdministrador, correoAdministrador, contrasenaAdministrador
      FROM nimbo.administradores
      WHERE BINARY administradores.correoAdministrador = "${email}"
      LIMIT 1;
    `
    const results = await connector.runQuery(query).then(res => res.results)
    if (results && results[0]) {
      const admin = results[0]
      return new UserDto(admin.idAdministrador, admin.correoAdministrador, admin.contrasenaAdministrador, Roles.ADMINISTRATOR)
    }
    return undefined
  }

  async #findReceptionistByEmail (email, connector) {
    const query = `
      SELECT idRecepcionista, correoRecepcionista, contrasenaRecepcionista
      FROM nimbo.recepcionistas
      WHERE BINARY recepcionistas.correoRecepcionista = "${email}"
      LIMIT 1;
    `
    const results = await connector.runQuery(query).then(res => res.results)
    if (results && results[0]) {
      const receptionist = results[0]
      return new UserDto(receptionist.idRecepcionista, receptionist.correoRecepcionista, receptionist.contrasenaRecepcionista, Roles.RECEPTIONIST)
    }
    return undefined
  }
}
