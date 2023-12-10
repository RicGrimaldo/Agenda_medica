const dayjs = require('dayjs')

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
    if (medicEntity && this.#validateDates(workStart, workEnd, lunchStart, lunchEnd)) {
      medicEntity.addMultipleSchedules(workStart.format(), lunchStart.format(), duration)
      medicEntity.addMultipleSchedules(lunchEnd.format(), workEnd.format(), duration)
      const ids = await this.medicStorage.createSchedules(medicEntity.id, medicEntity.scheduleDtos)
      return ids.length > 0
    } else {
      return false
    }
  }

  #validateDates(workStart, workEnd, lunchStart, lunchEnd) {
    return (
      workStart.isBefore(workEnd) &&
      workEnd.isAfter(workStart) &&
      lunchEnd.isAfter(workStart) &&
      lunchStart.isBefore(workEnd) &&
      lunchEnd.isBefore(workEnd) &&
      lunchStart.isBefore(lunchEnd)
    )
  }
}
