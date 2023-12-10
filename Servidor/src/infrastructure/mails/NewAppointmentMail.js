const dayjs = require('dayjs')

module.exports = class NewAppointmentMail {
  getTemplate (expAppointmentDto, qr) {
    const DATE = dayjs(expAppointmentDto.scheduleDto.startDateTime).format('DD/MM/YYYY')
    const TIME_START = dayjs(expAppointmentDto.scheduleDto.startDateTime).format('HH:mm:ss')
    const TIME_END = dayjs(expAppointmentDto.scheduleDto.endDateTime).format('HH:mm:ss')
    const MEDIC_NAME = expAppointmentDto.expMedicDto.name
    const MEDIC_SPECIALITY = expAppointmentDto.expMedicDto.specialityDto.name
    const MEDIC_OFFICE = expAppointmentDto.expMedicDto.office
    const MODALITY = expAppointmentDto.modality
    return `
      <body>
        <h1 class="text-center" style="text-align: center;">Datos de reservación de cita</h1>
        <table class="center" style="border: 1px solid black;border-radius: 10px;text-align: center;margin-left: auto;margin-right: auto;">
          <tr>
            <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Fecha</th>
            <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Hora de inicio</th>
            <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Hora de fin</th>
            <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Nombre del medico</th>
            <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Especialidad</th>
            <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Consultorio del medico</th>
            <th style="border: 1px solid black;border-radius: 10px;text-align: center;padding: 0.5rem;">Modalidad</th>
          </tr>
          <tr>
            <td style="border: 1px solid black;border-radius: 10px;text-align: center;">${DATE}</td>
            <td style="border: 1px solid black;border-radius: 10px;text-align: center;">${TIME_START}</td>
            <td style="border: 1px solid black;border-radius: 10px;text-align: center;">${TIME_END}</td>
            <td style="border: 1px solid black;border-radius: 10px;text-align: center;">${MEDIC_NAME}</td>
            <td style="border: 1px solid black;border-radius: 10px;text-align: center;">${MEDIC_SPECIALITY}</td>
            <td style="border: 1px solid black;border-radius: 10px;text-align: center;">${MEDIC_OFFICE}</td>
            <td style="border: 1px solid black;border-radius: 10px;text-align: center;">${MODALITY}</td>
          </tr>
        </table>
        <div style="text-align: center;">
          <img src="${qr}">
        </div>
      </body>
    `
  }
}
