const GetReservedMedicDiaryResDto = require('../../dtos/responses/GetAllResDto')
const NotFoundResDto = require('../../dtos/responses/DefaultResWithMsgDto')
module.exports = class AdminCanGetReservedMedicDiaryUseCase {
  #appointmentStorage

  constructor (appointmentStorage) {
    this.#appointmentStorage = appointmentStorage
  }

  get appointmentStorage () {
    return this.#appointmentStorage
  }

  async getReservedMedicDiary (medicId) {
    const medicDiary = await this.appointmentStorage.findReservedByMedicId(medicId)
    if (medicDiary && medicDiary.length) {
      return new GetReservedMedicDiaryResDto(true, medicDiary)
    }
    return new NotFoundResDto(false, 'No se encontraron citas del médico con ID ' + medicId)
  }
}
