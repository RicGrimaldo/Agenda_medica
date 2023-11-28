const DeletePatientResDto = require('../../dtos/responses/DefaultResWithMsgDto')

module.exports = class AdminCanDeletePatientUseCase {
  #patientStorage

  constructor (patientStorage) {
    this.#patientStorage = patientStorage
  }

  get patientStorage () {
    return this.#patientStorage
  }

  async delete (id) {
    const success = await this.patientStorage.delete(id)
    if (success) {
      return new DeletePatientResDto(true, 'paciente eliminado!')
    }
    return new DeletePatientResDto(false, 'No se pudo elimar al paciente con ID ' + id)
  }
}
