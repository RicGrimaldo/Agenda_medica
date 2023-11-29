const GetAllReceptionistResDto = require('../../dtos/responses/GetAllResDto')

module.exports = class AdminCanGetAllReceptionistUseCase {
  #receptionistStorage

  constructor (receptionistStorage) {
    this.#receptionistStorage = receptionistStorage
  }

  get receptionistStorage () {
    return this.#receptionistStorage
  }

  async getAll (isLocked = false) {
    const receptionists = await this.receptionistStorage.getAll(isLocked)
    return new GetAllReceptionistResDto(true, receptionists)
  }
}
