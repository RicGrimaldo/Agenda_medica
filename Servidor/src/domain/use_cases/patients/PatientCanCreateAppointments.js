const CreateAppointmentResDto = require('../../dtos/responses/CreateAppointmentResDto')

module.exports = class PatientCanCreateAppointmentsUseCase {
  #patientStorage
  #scheduleStorage
  #appointmentStorage

  constructor (patientStorage, scheduleStorage, appointmentStorage) {
    this.#patientStorage = patientStorage
    this.#scheduleStorage = scheduleStorage
    this.#appointmentStorage = appointmentStorage
  }

  get patientStorage () {
    return this.#patientStorage
  }

  get scheduleStorage () {
    return this.#scheduleStorage
  }

  get appointmentStorage () {
    return this.#appointmentStorage
  }

  async createAppointment (patientId, scheduleId, modalityId) {
    const patientEntity = await this.patientStorage.getById(patientId)
    const scheduleDto = await this.scheduleStorage.getById(scheduleId)

    if (patientEntity && scheduleDto) {
      try {
        patientEntity.createAppointment(await this.appointmentStorage.getAll(), scheduleDto.id, modalityId)
        const ids = await this.appointmentStorage.createAppointments(patientEntity.id, patientEntity.appointmentDtos)
        return new CreateAppointmentResDto(ids.length > 0, ids)
      } catch (error) {
        return new CreateAppointmentResDto(false, [])
      }
    }
    return new CreateAppointmentResDto(false, [])
  }
}
