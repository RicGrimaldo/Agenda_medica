const GetAllMedicResDto = require('../../dtos/responses/GetAllMedicResDto')

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
    return new GetAllMedicResDto(true, medics)
  }
}
