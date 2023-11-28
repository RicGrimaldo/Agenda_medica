module.exports = class GetAllMedicResDto {
  constructor (status, medics) {
    this._status = status
    this._medics = medics
  }

  get status () {
    return this._status
  }

  set status (status) {
    this._status = status
  }

  get medics () {
    return this._medics
  }

  set medics (medics) {
    this._medics = medics
  }
}
