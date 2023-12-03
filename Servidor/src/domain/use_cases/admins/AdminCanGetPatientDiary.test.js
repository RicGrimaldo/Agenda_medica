const AppointmentDto = require('../../dtos/AppointmentDto')
const AdminCanGetPatientDiaryUseCase = require('./AdminCanGetPatientDiary')
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

  findAllByPatientId (patientId) {
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
  let AdminCanGetPatientDiaryUC = null
  let appointmentStorage = null

  beforeEach(() => {
    appointmentStorage = generateAppointmentStorage()
    AdminCanGetPatientDiaryUC = new AdminCanGetPatientDiaryUseCase(appointmentStorage)
  })

  const generateAppointmentStorage = () => {
    appointmentStorage = new FakeAppointmentStorage()
    appointmentStorage.create(...APPOINTMENT_DTOS)
    return appointmentStorage
  }

  it('should be defined', () => {
    expect(AdminCanGetPatientDiaryUC).toBeDefined()
  })

  it('should get a patient diary', async () => {
    const patientId = 1
    const GetPatientDiaryResDto = await AdminCanGetPatientDiaryUC.getPatientDiary(patientId)
    expect(GetPatientDiaryResDto.status).toBeTruthy()
    GetPatientDiaryResDto.dtos.forEach(appointment => {
      expect(appointment.patientId).toBe(patientId)
    })
  })

  it('should fail when get a patient diary', async () => {
    const patientId = 10
    const GetPatientDiaryResDto = await AdminCanGetPatientDiaryUC.getPatientDiary(patientId)
    expect(GetPatientDiaryResDto.status).toBeFalsy()
    expect(GetPatientDiaryResDto.message).toBeDefined()
  })
})
