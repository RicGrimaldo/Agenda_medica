const GetPatientDiaryResDto = require('../../dtos/responses/GetAllResDto')
const NotFoundResDto = require('../../dtos/responses/DefaultResWithMsgDto')
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
    if (patientDiary && patientDiary.length) {
      return new GetPatientDiaryResDto(true, patientDiary)
    }
    return new NotFoundResDto(false, 'No se encontraron citas del médico con ID ' + patientId)
  }
}
