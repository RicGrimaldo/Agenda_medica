module.exports = class GetMedicResDto {
  constructor (status, medic) {
    this._status = status
    this._medic = medic
  }

  get status () {
    return this._status
  }

  set status (status) {
    this._status = status
  }

  get medic () {
    return this._medic
  }

  set medic (medic) {
    this._medic = medic
  }
}
