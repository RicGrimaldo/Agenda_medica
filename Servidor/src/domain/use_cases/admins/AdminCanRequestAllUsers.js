const GetAllUsersResDto = require('../../dtos/responses/GetAllUsersResDto')
const MedicMapper = require('../../mappers/MedicMapper')
const PatientMapper = require('../../mappers/PatientMapper')

module.exports = class AdminCanRequestAllUsersUseCase {
  #receptionistStorage
  #patientStorage
  #medicStorage

  constructor (receptionistStorage, patientStorage, medicStorage) {
    this.#receptionistStorage = receptionistStorage
    this.#patientStorage = patientStorage
    this.#medicStorage = medicStorage
  }

  get receptionistStorage () {
    return this.#receptionistStorage
  }

  get patientStorage () {
    return this.#patientStorage
  }

  get medicStorage () {
    return this.#medicStorage
  }

  async getAllUsers () {
    const receptionistDtos = await this.receptionistStorage.getAll()
    const medicEntities = await this.medicStorage.getAll()
    const patientEntities = await this.patientStorage.getAll()
    const medicMapper = new MedicMapper()
    const patientMapper = new PatientMapper()

    return new GetAllUsersResDto(
      receptionistDtos,
      medicEntities.map((medicEntity) => medicMapper.format(medicEntity)),
      patientEntities.map((patientEntity) => patientMapper.format(patientEntity))
    )
  }
}
