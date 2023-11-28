module.exports = class UserCanUpdateAnAppointmentUseCase {
  #diagnosticStorage
  #appointmentStorage

  constructor (appointmentStorage) {
    this.#appointmentStorage = appointmentStorage
  }

  get appointmentStorage () {
    return this.#appointmentStorage
  }

  async updateAppointment (appointmentId, patientId, modality, notes) {
    const appointmentDto = await this.appointmentStorage.getById(appointmentId)
    appointmentDto.patientId = patientId
    appointmentDto.modality = modality
    appointmentDto.notes = notes
    const result = await this.appointmentStorage.update(appointmentDto)
    return result
  }
}
