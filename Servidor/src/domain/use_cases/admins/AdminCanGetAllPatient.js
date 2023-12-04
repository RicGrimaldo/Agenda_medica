const GetAllPatientResDto = require('../../dtos/responses/GetAllResDto')
const PatientMapper = require('../../mappers/PatientMapper')

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
    const patientMapper = new PatientMapper()

    return new GetAllPatientResDto(true,
      patients.map((patientEntity) => patientMapper.format(patientEntity)))
  }
}
