const CreatePatientResDto = require('../../dtos/responses/DefaultResWithMsgDto')

module.exports = class AdminCanCreatePatientUseCase {
  #userStorage
  #patientStorage

  constructor (userStorage, patientStorage) {
    this.#userStorage = userStorage
    this.#patientStorage = patientStorage
  }

  get userStorage () {
    return this.#userStorage
  }

  get patientStorage () {
    return this.#patientStorage
  }

  async create (patientDto) {
    const validEmail = await this.validateEmail(patientDto.correoPaciente)

    if (validEmail) {
      const patient = await this.patientStorage.create(patientDto)
      return new CreatePatientResDto(patient.status, patient.message)
    }
    return new CreatePatientResDto(false, 'Correo inválido. El correo ya está registrado en otro usuario.')
  }

  async validateEmail (email) {
    const inUseEmail = await this.userStorage.findByEmail(email)
    return !inUseEmail
  }
}
