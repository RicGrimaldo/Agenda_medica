module.exports = class UserCanRequestAvailableSchedulesUseCase {
  #scheduleStorage

  constructor (scheduleStorage) {
    this.#scheduleStorage = scheduleStorage
  }

  get scheduleStorage () {
    return this.#scheduleStorage
  }

  async getAvailableSchedules (medicId, startDateTime) {
    const availableScheduleDtos = await this.scheduleStorage.getAvailableByMedic(medicId, startDateTime)
    return availableScheduleDtos
  }
}
