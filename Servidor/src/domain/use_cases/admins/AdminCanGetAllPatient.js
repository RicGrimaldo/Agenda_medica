const GetAllPatientResDto = require('../../dtos/responses/GetAllResDto')

module.exports = class AdminCanGetAllPatientUseCase {
  #patientStorage

  constructor (patientStorage) {
    this.#patientStorage = patientStorage
  }

  get patientStorage () {
    return this.#patientStorage
  }

  async getAll (isLocked = false) {
    const patients = await this.patientStorage.getAll(isLocked)
    return new GetAllPatientResDto(true, patients)
  }
}
