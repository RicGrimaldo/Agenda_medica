const ExpMedicDto = require('../dtos/expanded/ExpMedicDto')

module.exports = class ExpMedicMapper {
  format (medicDto, specialityDto) {
    return new ExpMedicDto(
      medicDto.id,
      medicDto.name,
      medicDto.curp,
      medicDto.birthDate,
      medicDto.email,
      medicDto.phone,
      medicDto.address,
      medicDto.specialityId,
      medicDto.office,
      medicDto.professionalId,
      medicDto.password,
      medicDto.blocked,
      specialityDto
    )
  }
}
