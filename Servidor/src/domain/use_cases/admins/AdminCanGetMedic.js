const GetMedicResDto = require('../../dtos/responses/GetResDto')
const NotFoundResDto = require('../../dtos/responses/DefaultResWithMsgDto')
module.exports = class AdminCanGetMedicUseCase {
  #medicStorage

  constructor (medicStorage) {
    this.#medicStorage = medicStorage
  }

  get medicStorage () {
    return this.#medicStorage
  }

  async get (id) {
    const medic = await this.medicStorage.getById(id)
    if (medic) {
      const date = new Date(medic.birthDate)
      medic.birthDate = date.toISOString().slice(0, 10)
      return new GetMedicResDto(true, medic)
    }
    return new NotFoundResDto(false, 'No se pudo encontrar al médico con ID ' + id)
  }
}
