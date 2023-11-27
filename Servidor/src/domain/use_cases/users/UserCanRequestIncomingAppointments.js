const ExpAppointmentMapper = require('../../mappers/ExpAppointmentMapper')
const PatientMapper = require('../../mappers/PatientMapper')

module.exports = class UserCanRequestIncomingAppointmentsUseCase {
  #patientStorage
  #scheduleStorage
  #appointmentStorage
  #medicStorage

  constructor (patientStorage, scheduleStorage, appointmentStorage, medicStorage) {
    this.#patientStorage = patientStorage
    this.#scheduleStorage = scheduleStorage
    this.#appointmentStorage = appointmentStorage
    this.#medicStorage = medicStorage
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

  get medicStorage () {
    return this.#medicStorage
  }

  async getIncomingAppointments () {
    const patientSaver = {}
    const scheduleSaver = {}
    const expMedicSaver = {}
    const appointmentDtos = await this.appointmentStorage.getIncoming()
    const expAppointmentMapper = new ExpAppointmentMapper()
    const expAppointmentDtos = await Promise.all(
      appointmentDtos.map(async (appointmentDto) => {
        const patientDto = await this.#getPatientDto(appointmentDto.patientId, patientSaver)
        const scheduleDto = await this.#getScheduleDto(appointmentDto.scheduleId, scheduleSaver)
        const expMedicDto = await this.#getExpMedicDto(scheduleDto.medicId, expMedicSaver)
        if (!patientDto || !scheduleDto || !expMedicDto) throw new Error('Missing data!')
        return expAppointmentMapper.format(patientDto, scheduleDto, expMedicDto, appointmentDto)
      })
    )
    return expAppointmentDtos
  }

  async #getPatientDto (patientId, patientSaver) {
    if (!patientSaver[patientId]) {
      const patientEntity = await this.patientStorage.getById(patientId)
      patientSaver[patientId] = new PatientMapper().format(patientEntity)
    }
    return patientSaver[patientId]
  }

  async #getScheduleDto (scheduleId, scheduleSaver) {
    if (!scheduleSaver[scheduleId]) {
      const scheduleDto = await this.scheduleStorage.getById(scheduleId)
      scheduleSaver[scheduleId] = scheduleDto
    }
    return scheduleSaver[scheduleId]
  }

  async #getExpMedicDto (medicId, expMedicSaver) {
    if (!expMedicSaver[medicId]) {
      const expMedicDto = await this.medicStorage.getExpandedById(medicId)
      expMedicSaver[medicId] = expMedicDto
    }
    return expMedicSaver[medicId]
  }
}
