const UpdateReceptionistResDto = require('../../dtos/responses/DefaultResWithMsgDto')

module.exports = class AdminCanUpdateReceptionistUseCase {
  #userStorage
  #receptionistStorage

  constructor (userStorage, receptionistStorage) {
    this.#userStorage = userStorage
    this.#receptionistStorage = receptionistStorage
  }

  get userStorage () {
    return this.#userStorage
  }

  get receptionistStorage () {
    return this.#receptionistStorage
  }

  async update (id, receptionistDto, email) {
    const validEmail = await this.validateEmail(id, email)

    if (validEmail) {
      const receptionist = await this.receptionistStorage.update(id, receptionistDto)
      return new UpdateReceptionistResDto(receptionist.result, receptionist.message)
    }
    return new UpdateReceptionistResDto(false, 'Correo inválido. El correo ya está registrado en otro usuario.')
  }

  async validateEmail (id, email) {
    const user = await this.userStorage.findByEmail(email)
    return !user || parseInt(user.id) === parseInt(id)
  }
}
