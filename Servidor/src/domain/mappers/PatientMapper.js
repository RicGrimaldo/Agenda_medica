const PatientDto = require('../dtos/entities/PatientDto')

module.exports = class PatientMapper {
  format (patientEntity) {
    return new PatientDto(
      patientEntity.id,
      patientEntity.name,
      patientEntity.curp,
      patientEntity.birthDate,
      patientEntity.email,
      patientEntity.phone,
      patientEntity.address,
      patientEntity.age,
      patientEntity.genre,
      patientEntity.password,
      patientEntity.blocked
    )
  }
}
