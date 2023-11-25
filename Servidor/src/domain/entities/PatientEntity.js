const AppointmentDto = require('../dtos/AppointmentDto')

module.exports = class PatientEntity {
  #id
  #appointmentDtos

  constructor (id, appointmentDtos) {
    this.#id = id
    this.#appointmentDtos = appointmentDtos
  }

  get id () {
    return this.#id
  }

  get appointmentDtos () {
    return this.#appointmentDtos
  }

  createAppointment (globalAppointmentDtos, scheduleId, modalityId) {
    if (this.#scheduleIsOccupied(globalAppointmentDtos, scheduleId)) throw new Error('Invalid schedule!')
    this.appointmentDtos.push(new AppointmentDto(undefined, this.id, scheduleId, modalityId))
  }

  #scheduleIsOccupied (appointmentDtos, scheduleId) {
    return appointmentDtos.some(appointmentDto => appointmentDto.scheduleId === scheduleId)
  }
}
