module.exports = class CreateAppointmentResDto {
  constructor (status, expAppointmentDto) {
    this._status = status
    this._expAppointmentDto = expAppointmentDto
  }

  get status () {
    return this._status
  }

  set status (status) {
    this._status = status
  }

  get expAppointmentDto () {
    return this._expAppointmentDto
  }

  set expAppointmentDto (expAppointmentDto) {
    this._expAppointmentDto = expAppointmentDto
  }
}
