module.exports = class GetResDto {
  constructor (status, dto) {
    this._status = status
    this._dto = dto
  }

  get status () {
    return this._status
  }

  set status (status) {
    this._status = status
  }

  get dto () {
    return this._dto
  }

  set dto (dto) {
    this._dto = dto
  }
}
