const CreateAppointmentResDto = require('../../dtos/responses/CreateAppointmentResDto')
const ExpAppointmentMapper = require('../../mappers/ExpAppointmentMapper')
const PatientMapper = require('../../mappers/PatientMapper')

module.exports = class PatientCanCreateAppointmentsUseCase {
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

  async createAppointment (patientId, scheduleId, modalityId) {
    const patientEntity = await this.patientStorage.getById(patientId)
    const scheduleDto = await this.scheduleStorage.getById(scheduleId)

    if (patientEntity && scheduleDto) {
      try {
        patientEntity.addAppointment(await this.appointmentStorage.getAll(), scheduleDto.id, modalityId)
        const appointmentDto = patientEntity.appointmentDtos[patientEntity.appointmentDtos.length - 1]
        const ids = await this.appointmentStorage.createAppointments(patientEntity.id, [appointmentDto])
        if (ids.length > 0) {
          appointmentDto.id = ids[0]
          const patientDto = new PatientMapper().format(patientEntity)
          const expMedicDto = await this.medicStorage.getExpandedById(scheduleDto.medicId)
          const expAppointmentDto = new ExpAppointmentMapper().format(patientDto, scheduleDto, expMedicDto, appointmentDto)
          return new CreateAppointmentResDto(true, expAppointmentDto)
        }
      } catch (error) {
        return new CreateAppointmentResDto(false, undefined)
      }
    }
    return new CreateAppointmentResDto(false, undefined)
  }
}
