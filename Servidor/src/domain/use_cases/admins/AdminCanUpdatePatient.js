const UpdatePatientResDto = require('../../dtos/responses/DefaultResWithMsgDto')

module.exports = class AdminCanUpdatePatientUseCase {
  #userStorage
  #patientStorage
  #appointmentStorage

  constructor (userStorage, patientStorage, appointmentStorage) {
    this.#userStorage = userStorage
    this.#patientStorage = patientStorage
    this.#appointmentStorage = appointmentStorage
  }

  get userStorage () {
    return this.#userStorage
  }

  get patientStorage () {
    return this.#patientStorage
  }

  get appointmentStorage () {
    return this.#appointmentStorage
  }

  async update (id, patientDto) {
    const validEmail = await this.validateEmail(id, patientDto.email)

    if (validEmail) {
      const patient = await this.patientStorage.update(id, patientDto)

      if (patient.result && patientDto.blocked) {
        this.appointmentStorage.releaseByPatientId(patientDto.id)
      }

      return new UpdatePatientResDto(patient.result, patient.message)
    }
    return new UpdatePatientResDto(false, 'Correo inválido. El correo ya está registrado en otro usuario.')
  }

  async validateEmail (id, email) {
    const user = await this.userStorage.findByEmail(email)
    return !user || user.id === id
  }
}
