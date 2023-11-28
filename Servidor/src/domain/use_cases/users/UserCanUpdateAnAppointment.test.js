const AppointmentModalities = require('../../constants/AppointmentModalities')
const AppointmentDto = require('../../dtos/AppointmentDto')
const UserCanUpdateAnAppointmentUseCase = require('./UserCanUpdateAnAppointment')

class FakeAppointmentStorage {
  #appointmentDtos

  constructor (appointmentDtos) {
    this.#appointmentDtos = appointmentDtos
  }

  get appointmentDtos () {
    return this.#appointmentDtos
  }

  async getById (id) {
    return new Promise((resolve) => {
      resolve(this.appointmentDtos.find((appointmentDto) => appointmentDto.id === id))
    })
  }

  async update (appointmentDto) {
    return new Promise((resolve) => resolve(true))
  }
}

describe('Test UserCanUpdateAnAppointmentUseCase', () => {
  let userCanUpdateAnAppointmentUC = null
  const ID = 1
  const PATIENT_ID = 1
  const SCHEDULE_ID = 1
  const MODALITY = AppointmentModalities.IN_PERSON
  const NOTES = ''

  beforeEach(() => {
    const appointmentDto = new AppointmentDto(ID, PATIENT_ID, SCHEDULE_ID, MODALITY, NOTES)
    userCanUpdateAnAppointmentUC = new UserCanUpdateAnAppointmentUseCase(new FakeAppointmentStorage([appointmentDto]))
  })

  it('should be defined', () => {
    expect(userCanUpdateAnAppointmentUC).toBeDefined()
  })

  it('should update an appointment', async () => {
    const NEW_PATIENT_ID = 7
    const NEW_MODALITY = AppointmentModalities.WEB
    const NEW_NOTES = 'NOTES'
    const result = await userCanUpdateAnAppointmentUC.updateAppointment(ID, NEW_PATIENT_ID, NEW_MODALITY, NEW_NOTES)
    expect(result).toBeTruthy()
  })
})
