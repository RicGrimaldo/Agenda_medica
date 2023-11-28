module.exports = class GetAllResDto {
  constructor (status, dtos) {
    this._status = status
    this._dtos = dtos
  }

  get status () {
    return this._status
  }

  set status (status) {
    this._status = status
  }

  get dtos () {
    return this._dtos
  }

  set dtos (dtos) {
    this._dtos = dtos
  }
}
