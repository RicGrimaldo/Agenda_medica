const AppointmentDto = require('../../dtos/AppointmentDto')
const AdminCanGetMedicDiaryUseCase = require('./AdminCanGetMedicDiary')
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

  findAllByMedicId (medicId) {
    return new Promise((resolve) => {
      resolve(this.#appointments.filter(appointmentDto => appointmentDto.medicId === medicId))
    })
  }
}

describe('Test admin can get all medic appointments use case', () => {
  const APPOINTMENT_DTOS = [
    new AppointmentDto(1, 5, 1, AppointmentModalities.IN_PERSON, '', 1),
    new AppointmentDto(2, 5, 2, AppointmentModalities.WEB, '', 1),
    new AppointmentDto(3, 8, 6, AppointmentModalities.ON_TELEPHONE, '', 1),
    new AppointmentDto(4, 9, 10, AppointmentModalities.IN_PERSON, '')
  ]
  let AdminCanGetMedicDiaryUC = null
  let appointmentStorage = null

  beforeEach(() => {
    appointmentStorage = generateAppointmentStorage()
    AdminCanGetMedicDiaryUC = new AdminCanGetMedicDiaryUseCase(appointmentStorage)
  })

  const generateAppointmentStorage = () => {
    appointmentStorage = new FakeAppointmentStorage()
    appointmentStorage.create(...APPOINTMENT_DTOS)
    return appointmentStorage
  }

  it('should be defined', () => {
    expect(AdminCanGetMedicDiaryUC).toBeDefined()
  })

  it('should get a medic diary', async () => {
    const medicId = 1
    const GetMedicDiaryResDto = await AdminCanGetMedicDiaryUC.getMedicDiary(medicId)
    expect(GetMedicDiaryResDto.status).toBeTruthy()
    GetMedicDiaryResDto.dtos.forEach(appointment => {
      expect(appointment.medicId).toBe(medicId)
    })
  })

  it('should fail when get a medic diary', async () => {
    const medicId = 10
    const GetMedicDiaryResDto = await AdminCanGetMedicDiaryUC.getMedicDiary(medicId)
    expect(GetMedicDiaryResDto.status).toBeFalsy()
    expect(GetMedicDiaryResDto.message).toBeDefined()
  })
})
