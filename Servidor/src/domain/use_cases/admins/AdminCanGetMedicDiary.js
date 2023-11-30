const GetMedicDiaryResDto = require('../../dtos/responses/GetAllResDto')
const NotFoundResDto = require('../../dtos/responses/DefaultResWithMsgDto')
module.exports = class AdminCanGetMedicDiaryUseCase {
  #appointmentStorage

  constructor (appointmentStorage) {
    this.#appointmentStorage = appointmentStorage
  }

  get appointmentStorage () {
    return this.#appointmentStorage
  }

  async getMedicDiary (medicId) {
    const medicDiary = await this.appointmentStorage.findAllByMedicId(medicId)
    if (medicDiary && medicDiary.length) {
      return new GetMedicDiaryResDto(true, medicDiary)
    }
    return new NotFoundResDto(false, 'No se encontraron citas del médico con ID ' + medicId)
  }
}
