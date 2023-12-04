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
    const patient = await this.patientStorage.getById(id)
    if (patient) {
      const date = new Date(patient.birthDate)
      patient.birthDate = date.toISOString().slice(0, 10)

      return new GetPatientResDto(true, patient)
    }
    return new NotFoundResDto(false, 'No se pudo encontrar al paciente con ID ' + id)
  }
}
