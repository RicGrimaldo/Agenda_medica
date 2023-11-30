const AppointmentDto = require('../../dtos/AppointmentDto')
const AdminCanGetReservedMedicDiaryUseCase = require('./AdminCanGetReservedMedicDiary')
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

  findReservedByMedicId (medicId) {
    return new Promise((resolve) => {
      resolve(this.#appointments.filter(appointmentDto => appointmentDto.medicId === medicId && appointmentDto.patientId !== null))
    })
  }
}

describe('Test admin can get reserved medic appointments use case', () => {
  const APPOINTMENT_DTOS = [
    new AppointmentDto(1, 2, 1, AppointmentModalities.IN_PERSON, '', 1),
    new AppointmentDto(2, 5, 2, AppointmentModalities.WEB, '', 1),
    new AppointmentDto(3, null, 6, AppointmentModalities.ON_TELEPHONE, '', 1),
    new AppointmentDto(4, 9, 10, AppointmentModalities.IN_PERSON, '')
  ]
  let AdminCanGetReservedMedicDiaryUC = null
  let appointmentStorage = null

  beforeEach(() => {
    appointmentStorage = generateAppointmentStorage()
    AdminCanGetReservedMedicDiaryUC = new AdminCanGetReservedMedicDiaryUseCase(appointmentStorage)
  })

  const generateAppointmentStorage = () => {
    appointmentStorage = new FakeAppointmentStorage()
    appointmentStorage.create(...APPOINTMENT_DTOS)
    return appointmentStorage
  }

  it('should be defined', () => {
    expect(AdminCanGetReservedMedicDiaryUC).toBeDefined()
  })

  it('should get reserved medic appointments', async () => {
    const medicId = 1
    const GetReservedMedicDiaryResDto = await AdminCanGetReservedMedicDiaryUC.getReservedMedicDiary(medicId)
    expect(GetReservedMedicDiaryResDto.status).toBeTruthy()
    GetReservedMedicDiaryResDto.dtos.forEach(appointment => {
      expect(appointment.medicId).toBe(medicId)
      expect(appointment.patientId).toBeDefined()
    })
  })

  it('should fail when get reserved medic appointments', async () => {
    const medicId = 10
    const GetReservedMedicDiaryResDto = await AdminCanGetReservedMedicDiaryUC.getReservedMedicDiary(medicId)
    expect(GetReservedMedicDiaryResDto.status).toBeFalsy()
    expect(GetReservedMedicDiaryResDto.message).toBeDefined()
  })
})
