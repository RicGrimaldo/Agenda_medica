const AppointmentDto = require('../../dtos/AppointmentDto')
const AdminCanGetAvailableMedicDiaryUseCase = require('./AdminCanGetAvailableMedicDiary')
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

  findAvailableByMedicId (medicId) {
    return new Promise((resolve) => {
      resolve(this.#appointments.filter(appointmentDto => appointmentDto.medicId === medicId && appointmentDto.patientId === null))
    })
  }
}

describe('Test admin can get available medic appointments use case', () => {
  const APPOINTMENT_DTOS = [
    new AppointmentDto(1, null, 1, AppointmentModalities.IN_PERSON, '', 1),
    new AppointmentDto(2, 5, 2, AppointmentModalities.WEB, '', 1),
    new AppointmentDto(3, null, 6, AppointmentModalities.ON_TELEPHONE, '', 1),
    new AppointmentDto(4, 9, 10, AppointmentModalities.IN_PERSON, '')
  ]
  let AdminCanGetAvailableMedicDiaryUC = null
  let appointmentStorage = null

  beforeEach(() => {
    appointmentStorage = generateAppointmentStorage()
    AdminCanGetAvailableMedicDiaryUC = new AdminCanGetAvailableMedicDiaryUseCase(appointmentStorage)
  })

  const generateAppointmentStorage = () => {
    appointmentStorage = new FakeAppointmentStorage()
    appointmentStorage.create(...APPOINTMENT_DTOS)
    return appointmentStorage
  }

  it('should be defined', () => {
    expect(AdminCanGetAvailableMedicDiaryUC).toBeDefined()
  })

  it('should get available medic appointments', async () => {
    const medicId = 1
    const GetAvailableMedicDiaryResDto = await AdminCanGetAvailableMedicDiaryUC.getAvailableMedicDiary(medicId)
    expect(GetAvailableMedicDiaryResDto.status).toBeTruthy()
    GetAvailableMedicDiaryResDto.dtos.forEach(appointment => {
      expect(appointment.medicId).toBe(medicId)
      expect(appointment.patientId).toBeNull()
    })
  })

  it('should fail when get available medic appointments', async () => {
    const medicId = 10
    const GetAvailableMedicDiaryResDto = await AdminCanGetAvailableMedicDiaryUC.getAvailableMedicDiary(medicId)
    expect(GetAvailableMedicDiaryResDto.status).toBeFalsy()
    expect(GetAvailableMedicDiaryResDto.message).toBeDefined()
  })
})
