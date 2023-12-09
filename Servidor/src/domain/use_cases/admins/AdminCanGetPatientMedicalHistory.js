const GetPatientMedicalHistoryResDto = require('../../dtos/responses/GetAllResDto')
module.exports = class AdminCanGetPatientMedicalHistoryUseCase {
  #appointmentStorage

  constructor (appointmentStorage) {
    this.#appointmentStorage = appointmentStorage
  }

  get appointmentStorage () {
    return this.#appointmentStorage
  }

  async getPatientMedicalHistory (patientId) {
    const patientMedicalHistory = await this.appointmentStorage.findMedicalHistoryByPatientId(patientId)
    return new GetPatientMedicalHistoryResDto(true, patientMedicalHistory)
  }
}
