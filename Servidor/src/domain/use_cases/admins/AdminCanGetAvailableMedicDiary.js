const GetAvailableMedicDiaryResDto = require('../../dtos/responses/GetAllResDto')
const NotFoundResDto = require('../../dtos/responses/DefaultResWithMsgDto')
module.exports = class AdminCanGetAvailableMedicDiaryUseCase {
  #appointmentStorage

  constructor (appointmentStorage) {
    this.#appointmentStorage = appointmentStorage
  }

  get appointmentStorage () {
    return this.#appointmentStorage
  }

  async getAvailableMedicDiary (medicId) {
    const medicDiary = await this.appointmentStorage.findAvailableByMedicId(medicId)
    if (medicDiary && medicDiary.length) {
      return new GetAvailableMedicDiaryResDto(true, medicDiary)
    }
    return new NotFoundResDto(false, 'No se encontraron citas del médico con ID ' + medicId)
  }
}
