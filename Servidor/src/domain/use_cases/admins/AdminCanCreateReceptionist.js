const CreateReceptionistResDto = require('../../dtos/responses/DefaultResWithMsgDto')

module.exports = class AdminCanCreateReceptionistUseCase {
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

  async create (receptionistDto) {
    const validEmail = await this.validateEmail(receptionistDto.email)

    if (validEmail) {
      const receptionist = await this.receptionistStorage.create(receptionistDto)
      return new CreateReceptionistResDto(receptionist.result, receptionist.message)
    }
    return new CreateReceptionistResDto(false, 'Correo inválido. El correo ya está registrado en otro usuario.')
  }

  async validateEmail (email) {
    const inUseEmail = await this.userStorage.findByEmail(email)

    if (inUseEmail) {
      return false
    }
    return true
  }
}
