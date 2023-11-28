const GetAllResDto = require('../../dtos/responses/GetAllResDto')

module.exports = class AdminCanGetAllMedicUseCase {
  #medicStorage

  constructor (medicStorage) {
    this.#medicStorage = medicStorage
  }

  get medicStorage () {
    return this.#medicStorage
  }

  async getAll (isLocked = false) {
    const medics = await this.medicStorage.getAll(isLocked)
    return new GetAllResDto(true, medics)
  }
}
