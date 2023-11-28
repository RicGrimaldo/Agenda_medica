const ExpAppointmentDto = require('../dtos/expanded/ExpAppointmentDto')

module.exports = class ExpAppointmentMapper {
  format (patientDto, scheduleDto, expMedicDto, appointmentDto) {
    return new ExpAppointmentDto(
      appointmentDto.id,
      appointmentDto.patientId,
      appointmentDto.scheduleId,
      appointmentDto.modality,
      appointmentDto.notes,
      patientDto,
      scheduleDto,
      expMedicDto
    )
  }
}
