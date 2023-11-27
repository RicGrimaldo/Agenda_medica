const MedicDto = require('../entities/MedicDto')

module.exports = class ExpMedicDto extends MedicDto {
  constructor (
    id,
    name,
    curp,
    birthDate,
    email,
    phone,
    address,
    specialityId,
    office,
    professionalId,
    password,
    blocked,
    specialityDto
  ) {
    super(
      id,
      name,
      curp,
      birthDate,
      email,
      phone,
      address,
      specialityId,
      office,
      professionalId,
      password,
      blocked
    )
    this._specialityDto = specialityDto
  }

  get specialityDto () {
    return this._specialityDto
  }

  set specialityDto (specialityDto) {
    this._specialityDto = specialityDto
  }
}
