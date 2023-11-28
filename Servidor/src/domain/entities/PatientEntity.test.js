const AppointmentModalities = require('../constants/AppointmentModalities')
const Genres = require('../constants/Genres')
const AppointmentDto = require('../dtos/AppointmentDto')
const PatientEntity = require('./PatientEntity')

describe('Test patient entity', () => {
  const ID = 1
  const GLOBAL_APPOINTMENT_DTOS = [
    new AppointmentDto(1, 5, 1, AppointmentModalities.IN_PERSON, ''),
    new AppointmentDto(2, 5, 2, AppointmentModalities.WEB, ''),
    new AppointmentDto(3, 8, 6, AppointmentModalities.ON_TELEPHONE, ''),
    new AppointmentDto(4, 9, 10, AppointmentModalities.IN_PERSON, '')
  ]
  let patientEntity = null

  beforeEach(() => {
    patientEntity = new PatientEntity(
      ID,
      'John Doe',
      'ABC123',
      '1990-01-01',
      'john.doe@example.com',
      99999999,
      '123 Main St',
      22,
      Genres.Maculine,
      'password123',
      false,
      []
    )
  })

  it('should be defined', () => {
    expect(patientEntity).toBeDefined()
  })

  it('should create an appointment', () => {
    const SCHEDULE_ID = 12
    patientEntity.addAppointment(GLOBAL_APPOINTMENT_DTOS, SCHEDULE_ID, AppointmentModalities.IN_PERSON)
    expect(patientEntity.appointmentDtos.length).toBe(1)
  })

  it('should create an appointment with the same data', () => {
    const SCHEDULE_ID = 12
    patientEntity.addAppointment(GLOBAL_APPOINTMENT_DTOS, SCHEDULE_ID, AppointmentModalities.IN_PERSON)
    const appointmentDto = patientEntity.appointmentDtos[0]
    expect(appointmentDto.patientId).toBe(ID)
    expect(appointmentDto.scheduleId).toBe(SCHEDULE_ID)
    expect(appointmentDto.modality).toBe(AppointmentModalities.IN_PERSON)
    expect(appointmentDto.notes).toBe('')
  })

  it('should not create an appointment if the schedule has been occupied', () => {
    const SCHEDULE_ID = 6
    expect(() => { patientEntity.addAppointment(GLOBAL_APPOINTMENT_DTOS, SCHEDULE_ID, AppointmentModalities.IN_PERSON) }).toThrow(Error)
  })
})
