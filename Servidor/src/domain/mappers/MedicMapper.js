const MedicDto = require('../dtos/entities/MedicDto')

module.exports = class MedicMapper {
  format (medicEntity) {
    return new MedicDto(
      medicEntity.id,
      medicEntity.name,
      medicEntity.curp,
      medicEntity.birthDate,
      medicEntity.email,
      medicEntity.phone,
      medicEntity.address,
      medicEntity.specialityId,
      medicEntity.office,
      medicEntity.professionalId,
      medicEntity.password,
      medicEntity.blocked
    )
  }
}
