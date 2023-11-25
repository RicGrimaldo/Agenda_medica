module.exports = class CreateAppointmentResDto {
  constructor (status, ids) {
    this._status = status
    this._ids = ids
  }

  get status () {
    return this._status
  }

  set status (status) {
    this._status = status
  }

  get ids () {
    return this._ids
  }

  set ids (ids) {
    this._ids = ids
  }
}
