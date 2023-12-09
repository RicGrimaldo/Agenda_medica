const NotFoundResDto = require('../../dtos/responses/DefaultResWithMsgDto')
const ExcelJS = require('exceljs')
module.exports = class AdminCanDownloadPatientMedicalHistoryUseCase {
  #appointmentStorage

  constructor (appointmentStorage) {
    this.#appointmentStorage = appointmentStorage
  }

  get appointmentStorage () {
    return this.#appointmentStorage
  }

  async downloadMedicalHistory (patientId) {
    const patientDiary = await this.appointmentStorage.findExcelMedicalHistoryByPatientId(patientId)
    if (patientDiary && patientDiary.length) {
      const book = new ExcelJS.Workbook()
      const file = book.addWorksheet('Historial clinico')

      file.columns = [
        { header: 'Fecha', key: 'fecha', width: 20 },
        { header: 'Hora', key: 'horaInicio', width: 20 },
        { header: 'Medico', key: 'nombreMedico', width: 35 },
        { header: 'Consultorio', key: 'consultorioMedico', width: 20 },
        { header: 'Modalidad', key: 'modalidad', width: 20 },
        { header: 'Notas de consulta', key: 'notasConsultas', width: 60 }
      ]

      file.autoFilter = 'A1:F1'

      for (let i = 0; i < patientDiary.length; i++) {
        file.addRow(patientDiary[i]).commit()
      }

      return {status: true, book: book}
    }
    return new NotFoundResDto(false, 'No se encontraron citas del paciente con ID ' + patientId)
  }
}
