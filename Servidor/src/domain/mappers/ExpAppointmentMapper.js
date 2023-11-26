const ExpAppointmentDto = require('../dtos/expanded/ExpAppointmentDto')
const MedicMapper = require('./MedicMapper')
const PatientMapper = require('./PatientMapper')

module.exports = class ExpAppointmentMapper {
  format (patientEntity, scheduleDto, medicEntity, appointmentDto) {
    return new ExpAppointmentDto(
      appointmentDto.id,
      appointmentDto.patientId,
      appointmentDto.scheduleId,
      appointmentDto.modality,
      new PatientMapper().format(patientEntity),
      scheduleDto,
      new MedicMapper().format(medicEntity)
    )
  }
}
