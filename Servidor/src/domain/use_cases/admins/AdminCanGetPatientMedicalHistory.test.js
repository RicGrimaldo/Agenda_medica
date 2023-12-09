const AppointmentDto = require('../../dtos/AppointmentDto')
const AdminCanGetPatientMedicalHistoryUseCase = require('./AdminCanGetPatientMedicalHistory')
const AppointmentModalities = require('../../constants/AppointmentModalities')

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

  findMedicalHistoryByPatientId (patientId) {
    return new Promise((resolve) => {
      resolve(this.#appointments.filter(appointmentDto => appointmentDto.patientId === patientId))
    })
  }
}

describe('Test admin can get patient medical history use case', () => {
  const APPOINTMENT_DTOS = [
    new AppointmentDto(1, 1, 1, AppointmentModalities.IN_PERSON, '', 1),
    new AppointmentDto(2, 1, 2, AppointmentModalities.WEB, '', 1),
    new AppointmentDto(3, 8, 6, AppointmentModalities.ON_TELEPHONE, '', 1),
    new AppointmentDto(4, 9, 10, AppointmentModalities.IN_PERSON, '')
  ]
  let AdminCanGetPatientMedicalHistoryUC = null
  let appointmentStorage = null

  beforeEach(() => {
    appointmentStorage = generateAppointmentStorage()
    AdminCanGetPatientMedicalHistoryUC = new AdminCanGetPatientMedicalHistoryUseCase(appointmentStorage)
  })

  const generateAppointmentStorage = () => {
    appointmentStorage = new FakeAppointmentStorage()
    appointmentStorage.create(...APPOINTMENT_DTOS)
    return appointmentStorage
  }

  it('should be defined', () => {
    expect(AdminCanGetPatientMedicalHistoryUC).toBeDefined()
  })

  it('should get a patient medical history', async () => {
    const patientId = 1
    const GetPatientMedicalHistoryResDto = await AdminCanGetPatientMedicalHistoryUC.getPatientMedicalHistory(patientId)
    expect(GetPatientMedicalHistoryResDto.status).toBeTruthy()
    GetPatientMedicalHistoryResDto.dtos.forEach(appointment => {
      expect(appointment.patientId).toBe(patientId)
    })
  })
})
