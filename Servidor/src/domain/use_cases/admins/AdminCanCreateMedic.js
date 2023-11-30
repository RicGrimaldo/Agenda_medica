const CreateMedicResDto = require('../../dtos/responses/DefaultResWithMsgDto')

module.exports = class AdminCanCreateMedicUseCase {
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

  async create (medicDto) {
    const validEmail = await this.validateEmail(medicDto.email)

    if (validEmail) {
      const medic = await this.medicStorage.create(medicDto)
      return new CreateMedicResDto(medic.result, medic.message)
    }
    return new CreateMedicResDto(false, 'Correo inválido. El correo ya está registrado en otro usuario.')
  }

  async validateEmail (email) {
    const inUseEmail = await this.userStorage.findByEmail(email)
    return !inUseEmail
  }
}
