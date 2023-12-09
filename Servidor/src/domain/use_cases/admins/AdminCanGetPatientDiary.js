const GetPatientDiaryResDto = require('../../dtos/responses/GetAllResDto')
module.exports = class AdminCanGetPatientDiaryUseCase {
  #appointmentStorage

  constructor (appointmentStorage) {
    this.#appointmentStorage = appointmentStorage
  }

  get appointmentStorage () {
    return this.#appointmentStorage
  }

  async getPatientDiary (patientId) {
    const patientDiary = await this.appointmentStorage.findAllByPatientId(patientId)
    return new GetPatientDiaryResDto(true, patientDiary)
  }
}
