const AppointmentDto = require('../AppointmentDto')

module.exports = class ExpAppointmentDto extends AppointmentDto {
  constructor (id, patientId, scheduleId, modality, patientDto, scheduleDto, medicDto) {
    super(id, patientId, scheduleId, modality)
    this._patientDto = patientDto
    this._scheduleDto = scheduleDto
    this._medicDto = medicDto
  }

  get patientDto () {
    return this._patientDto
  }

  set patientDto (patientDto) {
    this._patientDto = patientDto
  }

  get scheduleDto () {
    return this._scheduleDto
  }

  set scheduleDto (scheduleDto) {
    this._scheduleDto = scheduleDto
  }

  get medicDto () {
    return this._medicDto
  }

  set medicDto (medicDto) {
    this._medicDto = medicDto
  }
}
