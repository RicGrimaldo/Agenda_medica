const AppointmentDto = require('../AppointmentDto')

module.exports = class ExpAppointmentMapper extends AppointmentDto {
  constructor (id, patientId, scheduleId, modality, patientDto, medicDto) {
    super(id, patientId, scheduleId, modality)
    this._patientDto = patientDto
    this._medicDto = medicDto
  }

  get patientDto () {
    return this.patientDto
  }

  set patientDto (patientDto) {
    this._patientDto = patientDto
  }

  get medicDto () {
    return this._medicDto
  }

  set medicDto (medicDto) {
    this._medicDto = medicDto
  }
}
