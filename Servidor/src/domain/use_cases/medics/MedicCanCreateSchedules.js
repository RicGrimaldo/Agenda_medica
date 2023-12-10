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
    console.log("Obtenemos: ")
    console.log(medicEntity)
    console.log(this.#validateDates(workStart, workEnd, lunchStart, lunchEnd))
    if (medicEntity && this.#validateDates(workStart, workEnd, lunchStart, lunchEnd)) {
      medicEntity.addMultipleSchedules(workStart, lunchStart, duration)
      medicEntity.addMultipleSchedules(lunchEnd, workEnd, duration)
      console.log("MedicEntity: ")
      console.log(medicEntity)
      const ids = await this.medicStorage.createSchedules(medicEntity.id, medicEntity.scheduleDtos)
      console.log("Ids: ")
      console.log(ids)
      return ids.length > 0
    } else {
      return false
    }
  }

  #validateDates (workStart, workEnd, lunchStart, lunchEnd) {
    const W_START = dayjs(workStart)
    const W_END = dayjs(workEnd)
    const L_START = dayjs(lunchStart)
    const L_END = dayjs(lunchEnd)
    return W_START.isBefore(W_END) && L_START.isAfter(W_START) && L_END.isAfter(W_START) &&
      L_START.isBefore(W_END) && L_END.isBefore(W_END) && L_START.isBefore(L_END)
  }
}
