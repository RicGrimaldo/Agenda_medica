const GetReceptionistResDto = require('../../dtos/responses/GetResDto')
const NotFoundResDto = require('../../dtos/responses/DefaultResWithMsgDto')
module.exports = class AdminCanGetReceptionistUseCase {
  #receptionistStorage

  constructor (receptionistStorage) {
    this.#receptionistStorage = receptionistStorage
  }

  get receptionistStorage () {
    return this.#receptionistStorage
  }

  async get (id) {
    const receptionist = await this.receptionistStorage.findById(id)
    if (receptionist) {
      return new GetReceptionistResDto(true, receptionist)
    }
    return new NotFoundResDto(false, 'No se pudo encontrar al recepcionista con ID ' + id)
  }
}
