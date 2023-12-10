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
    let ids = []
    const medicEntity = await this.medicStorage.getById(medicId)
    console.log("Se cumple? " + this.#validateDates(workStart, workEnd, lunchStart, lunchEnd))
    if (medicEntity && this.#validateDates(workStart, workEnd, lunchStart, lunchEnd)) {
      medicEntity.addMultipleSchedules(workStart.format(), lunchStart.format(), duration)
      medicEntity.addMultipleSchedules(lunchEnd.format(), workEnd.format(), duration)
      const ids = await this.medicStorage.createSchedules(medicEntity.id, medicEntity.scheduleDtos)
      console.log("Ids: ")
      console.log(ids)
      return ids.length > 0
    } else {
      return false
    }
  }

  #validateDates(workStart, workEnd, lunchStart, lunchEnd) {
    console.log("Comparemos inicio: " + workStart.format() + " con fin " + workEnd.format() + " almuerzo de " + lunchStart.format() + " a " + lunchEnd.format())
    console.log(workStart.format())
  
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
