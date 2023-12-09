const AppointmentDto = require('../../dtos/AppointmentDto')
const AdminCanDownloadPatientMedicalHistoryUseCase = require('./AdminCanDownloadPatientMedicalHistory')
const AppointmentModalities = require('../../constants/AppointmentModalities')
const Exceljs = require('exceljs')
const ExcelJS = require('exceljs')

class FakeAppointmentStorage {
  #appointments

  constructor () {
    this.#appointments = []
  }

  get appointments () {
    return this.#appointments
  }

  create (appointmentDto) {
    this.#appointments.push(appointmentDto)
  }

  findExcelMedicalHistoryByPatientId (patientId) {
    return new Promise((resolve) => {
      resolve(this.#appointments.filter(appointmentDto => appointmentDto.patientId === patientId))
    })
  }
}

describe('Test admin can get all patient appointments use case', () => {
  const APPOINTMENT_DTOS = [
    new AppointmentDto(1, 1, 1, AppointmentModalities.IN_PERSON, '', 1),
    new AppointmentDto(2, 1, 2, AppointmentModalities.WEB, '', 1),
    new AppointmentDto(3, 8, 6, AppointmentModalities.ON_TELEPHONE, '', 1),
    new AppointmentDto(4, 9, 10, AppointmentModalities.IN_PERSON, '')
  ]
  let AdminCanDownloadPatientMedicalHistoryUC = null
  let appointmentStorage = null

  beforeEach(() => {
    appointmentStorage = generateAppointmentStorage()
    AdminCanDownloadPatientMedicalHistoryUC = new AdminCanDownloadPatientMedicalHistoryUseCase(appointmentStorage)
  })

  const generateAppointmentStorage = () => {
    appointmentStorage = new FakeAppointmentStorage()
    appointmentStorage.create(...APPOINTMENT_DTOS)
    return appointmentStorage
  }

  it('should be defined', () => {
    expect(AdminCanDownloadPatientMedicalHistoryUC).toBeDefined()
  })

  it('should download a patient medical history', async () => {
    const patientId = 1
    const ExcelFile = await AdminCanDownloadPatientMedicalHistoryUC.downloadMedicalHistory(patientId)
    expect(ExcelFile.status).toBeTruthy()
    expect(ExcelFile.book).toBeInstanceOf(ExcelJS.Workbook)
  })

  it('should fail when download a patient medical history', async () => {
    const patientId = 10
    const ExcelFile = await AdminCanDownloadPatientMedicalHistoryUC.downloadMedicalHistory(patientId)
    expect(ExcelFile.status).toBeFalsy()
    expect(ExcelFile.message).toBeDefined()
  })
})
