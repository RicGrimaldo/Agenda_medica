module.exports = class AppointmentMedicDto {
  constructor (id, name, date, startTime, endTime) {
    this._id = id
    this._name = name
    this._date = date
    this._startTime = startTime
    this._endTime = endTime
  }

  get id () {
    return this._id
  }

  set id (id) {
    this._id = id
  }

  get name () {
    return this._name
  }

  set name (name) {
    this._name = name
  }

  get date () {
    return this._date
  }

  set date (date) {
    this._date = date
  }

  get startTime () {
    return this._startTime
  }

  set startTime (startTime) {
    this._startTime = startTime
  }

  get endTime () {
    return this._endTime
  }

  set endTime (endTime) {
    this._endTime = endTime
  }
}
