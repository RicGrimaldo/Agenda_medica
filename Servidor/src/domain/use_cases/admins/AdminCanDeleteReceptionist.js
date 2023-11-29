const DeleteReceptionistResDto = require('../../dtos/responses/DefaultResWithMsgDto')

module.exports = class AdminCanDeleteReceptionistUseCase {
  #receptionistStorage

  constructor (receptionistStorage) {
    this.#receptionistStorage = receptionistStorage
  }

  get receptionistStorage () {
    return this.#receptionistStorage
  }

  async delete (id) {
    const success = await this.receptionistStorage.delete(id)
    if (success) {
      return new DeleteReceptionistResDto(true, 'recepcionista eliminado!')
    }
    return new DeleteReceptionistResDto(false, 'No se pudo elimar al recepcionista con ID ' + id)
  }
}
