module.exports = class AppointmentDto {
  constructor (id, patientId, scheduleId, modality) {
    this._id = id
    this._patientId = patientId
    this._scheduleId = scheduleId
    this._modality = modality
  }

  get id () {
    return this._id
  }

  set id (id) {
    this._id = id
  }

  get patientId () {
    return this._patientId
  }

  set patientId (patientId) {
    this._patientId = patientId
  }

  get scheduleId () {
    return this._scheduleId
  }

  set scheduleId (scheduleId) {
    this._scheduleId = scheduleId
  }

  get modality () {
    return this._modality
  }

  set modality (modality) {
    this._modality = modality
  }
}
