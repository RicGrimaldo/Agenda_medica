module.exports = class GetAllUsersResDto {
  constructor (receptionistDtos, medicDtos, patientDtos) {
    this._receptionistDtos = receptionistDtos
    this._medicDtos = medicDtos
    this._patientDtos = patientDtos
  }

  get receptionistDtos () {
    return this._receptionistDtos
  }

  set receptionistDtos (receptionistDtos) {
    this._receptionistDtos = receptionistDtos
  }

  get medicDtos () {
    return this._medicDtos
  }

  set medicDtos (medicDtos) {
    this._medicDtos = medicDtos
  }

  get patientDtos () {
    return this._patientDtos
  }

  set patientDtos (patientDtos) {
    this._patientDtos = patientDtos
  }
}
