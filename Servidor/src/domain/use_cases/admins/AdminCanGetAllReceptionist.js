const GetAllReceptionistResDto = require('../../dtos/responses/GetAllResDto')

module.exports = class AdminCanGetAllReceptionistUseCase {
  #receptionistStorage

  constructor (receptionistStorage) {
    this.#receptionistStorage = receptionistStorage
  }

  get receptionistStorage () {
    return this.#receptionistStorage
  }

  async getAll () {
    const receptionists = await this.receptionistStorage.getAll()
    console.log(receptionists)
    return new GetAllReceptionistResDto(true, receptionists)
  }
}
