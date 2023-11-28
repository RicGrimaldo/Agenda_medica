const UpdateMedicResDto = require('../../dtos/responses/DefaultResWithMsgDto')

module.exports = class AdminCanUpdateMedicUseCase {
  #userStorage
  #medicStorage

  constructor (userStorage, medicStorage) {
    this.#userStorage = userStorage
    this.#medicStorage = medicStorage
  }

  get userStorage () {
    return this.#userStorage
  }

  get medicStorage () {
    return this.#medicStorage
  }

  async update (id, medicDto) {
    const validEmail = await this.validateEmail(id, medicDto.email)

    if (validEmail) {
      const medic = await this.medicStorage.update(id, medicDto)
      return new UpdateMedicResDto(medic.result, medic.message)
    }
    return new UpdateMedicResDto(false, 'Correo inválido. El correo ya está registrado en otro usuario.')
  }

  async validateEmail (id, email) {
    const user = await this.userStorage.findByEmail(email)

    if (user && user.id !== id) {
      return false
    }
    return true
  }
}
