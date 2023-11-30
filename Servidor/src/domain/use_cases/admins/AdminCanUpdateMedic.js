const UpdateMedicResDto = require('../../dtos/responses/DefaultResWithMsgDto')

module.exports = class AdminCanUpdateMedicUseCase {
  #userStorage
  #medicStorage
  #appointmentStorage

  constructor (userStorage, medicStorage, appointmentStorage) {
    this.#userStorage = userStorage
    this.#medicStorage = medicStorage
    this.#appointmentStorage = appointmentStorage
  }

  get userStorage () {
    return this.#userStorage
  }

  get medicStorage () {
    return this.#medicStorage
  }

  get appointmentStorage () {
    return this.#appointmentStorage
  }

  async update (id, medicDto) {
    const validEmail = await this.validateEmail(id, medicDto.email)

    if (validEmail) {
      const medic = await this.medicStorage.update(id, medicDto)

      if (medic.result && medicDto.blocked) {
        this.appointmentStorage.releaseByMedicId(medicDto.id)
      }

      return new UpdateMedicResDto(medic.result, medic.message)
    }
    return new UpdateMedicResDto(false, 'Correo inválido. El correo ya está registrado en otro usuario.')
  }

  async validateEmail (id, email) {
    const user = await this.userStorage.findByEmail(email)
    return !user || user.id === id
  }
}
