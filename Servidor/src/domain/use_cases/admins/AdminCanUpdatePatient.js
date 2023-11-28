const UpdatePatientResDto = require('../../dtos/responses/DefaultResWithMsgDto')

module.exports = class AdminCanUpdatePatientUseCase {
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

  async update (id, patientDto) {
    const validEmail = await this.validateEmail(id, patientDto.email)

    if (validEmail) {
      const patient = await this.patientStorage.update(id, patientDto)
      return new UpdatePatientResDto(patient.result, patient.message)
    }
    return new UpdatePatientResDto(false, 'Correo inválido. El correo ya está registrado en otro usuario.')
  }

  async validateEmail (id, email) {
    const user = await this.userStorage.findByEmail(email)

    if (user && user.id !== id) {
      return false
    }
    return true
  }
}
