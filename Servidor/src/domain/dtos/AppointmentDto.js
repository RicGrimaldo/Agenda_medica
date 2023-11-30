module.exports = class AppointmentDto {
  constructor (id, patientId, scheduleId, modality, notes, medicId = null) {
    this._id = id
    this._patientId = patientId
    this._scheduleId = scheduleId
    this._modality = modality
    this._notes = notes
    this._medicId = medicId
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

  get notes () {
    return this._notes
  }

  set notes (notes) {
    this._notes = notes
  }

  get medicId () {
    return this._medicId
  }

  set medicId (medicId) {
    this._medicId = medicId
  }
}
