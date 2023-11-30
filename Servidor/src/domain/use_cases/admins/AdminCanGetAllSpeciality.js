const GetAllSpecialityResDto = require('../../dtos/responses/GetAllResDto')

module.exports = class AdminCanGetAllSpecialityUseCase {
  #specialityStorage

  constructor (specialityStorage) {
    this.#specialityStorage = specialityStorage
  }

  get specialityStorage () {
    return this.#specialityStorage
  }

  async getAll (isLocked = false) {
    const specialities = await this.specialityStorage.getAll(isLocked)
    return new GetAllSpecialityResDto(true, specialities)
  }
}
