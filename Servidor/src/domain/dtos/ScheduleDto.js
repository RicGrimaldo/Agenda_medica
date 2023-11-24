module.exports = class ScheduleDto {
  constructor (id, startDateTime, endDateTime) {
    this._id = id
    this._startDateTime = startDateTime
    this._endDateTime = endDateTime
  }

  get id () {
    return this._id
  }

  set id (id) {
    this._id = id
  }

  get startDateTime () {
    return this._startDateTime
  }

  set startDateTime (startDateTime) {
    this._startDateTime = startDateTime
  }

  get endDateTime () {
    return this._endDateTime
  }

  set endDateTime (endDateTime) {
    this._endDateTime = endDateTime
  }
}
