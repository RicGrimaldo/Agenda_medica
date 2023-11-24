module.exports = class MedicCanCreateSchedulesUseCase {
  #medicStorage

  constructor (medicStorage) {
    this.#medicStorage = medicStorage
  }

  get medicStorage () {
    return this.#medicStorage
  }

  async createSchedules (medicId, workStart, workEnd, duration, lunchStart, lunchEnd) {
    const medicEntity = await this.medicStorage.getById(medicId)
    if (medicEntity) {
      medicEntity.addMultipleSchedules(workStart, lunchStart, duration)
      medicEntity.addMultipleSchedules(lunchEnd, workEnd, duration)
      return await this.medicStorage.createSchedules(medicEntity.id, medicEntity.scheduleDtos)
    } else {
      return false
    }
  }
}
