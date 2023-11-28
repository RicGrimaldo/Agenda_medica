const GetPatientResDto = require('../../dtos/responses/GetResDto')
const NotFoundResDto = require('../../dtos/responses/DefaultResWithMsgDto')
module.exports = class AdminCanGetPatientUseCase {
  #patientStorage

  constructor (patientStorage) {
    this.#patientStorage = patientStorage
  }

  get patientStorage () {
    return this.#patientStorage
  }

  async get (id) {
    const patient = await this.patientStorage.findById(id)
    if (patient) {
      return new GetPatientResDto(true, patient)
    }
    return new NotFoundResDto(false, 'No se pudo encontrar al paciente con ID ' + id)
  }
}
