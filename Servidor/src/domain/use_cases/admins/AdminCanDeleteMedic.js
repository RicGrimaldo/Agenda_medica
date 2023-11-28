const DeleteMedicResDto = require('../../dtos/responses/DefaultResWithMsgDto')

module.exports = class AdminCanDeleteMedicUseCase {
  #medicStorage

  constructor (medicStorage) {
    this.#medicStorage = medicStorage
  }

  get medicStorage () {
    return this.#medicStorage
  }

  async delete (id) {
    const success = await this.medicStorage.delete(id)
    if (success) {
      return new DeleteMedicResDto(true, 'medico eliminado!')
    }
    return new DeleteMedicResDto(false, 'No se pudo elimar al médico con ID ' + id)
  }
}
