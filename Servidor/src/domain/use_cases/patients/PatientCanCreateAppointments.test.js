const dayjs = require('dayjs')
const ScheduleDto = require('../../dtos/ScheduleDto')
const PatientEntity = require('../../entities/PatientEntity')
const PatientCanCreateAppointmentsUseCase = require('./PatientCanCreateAppointments')
const AppointmentDto = require('../../dtos/AppointmentDto')
const AppointmentModalities = require('../../constants/AppointmentModalities')
const Genres = require('../../constants/Genres')

class FakePatientStorage {
  #patientEntities

  constructor (patientEntities) {
    this.#patientEntities = patientEntities
  }

  get patientEntities () {
    return this.#patientEntities
  }

  async getById (id) {
    return new Promise((resolve) => {
      resolve(this.patientEntities.find((patientEntity) => patientEntity.id === id))
    })
  }
}

class FakeScheduleStorage {
  #scheduleDtos

  constructor (scheduleDtos) {
    this.#scheduleDtos = scheduleDtos
  }

  get scheduleDtos () {
    return this.#scheduleDtos
  }

  async getById (id) {
    return new Promise((resolve) => {
      resolve(this.scheduleDtos.find((scheduleDto) => scheduleDto.id === id))
    })
  }
}

class FakeAppointmentStorage {
  #appointmentDtos

  constructor (appointmentDtos) {
    this.#appointmentDtos = appointmentDtos
  }

  get appointmentDtos () {
    return this.#appointmentDtos
  }

  async getAll () {
    return new Promise((resolve) => {
      resolve(this.appointmentDtos)
    })
  }

  async createAppointments (patientId, appointmentDtos) {
    return new Promise((resolve) => {
      resolve(
        patientId && appointmentDtos.filter((appointmentDto) => !appointmentDto.id)
          .map((_, index) => index + 100)
      )
    })
  }
}

describe('Test patient can create appointments use case', () => {
  const PATIENT_ID = 1
  const SCHEDULE_ID = 1
  const SECOND_SCHEDULE_ID = 2
  const MEDIC_ID = 1
  let patientCanCreateAppointmentsUC = null

  beforeEach(() => {
    const patientEntity = new PatientEntity(
      PATIENT_ID,
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
    const patientStorage = new FakePatientStorage([patientEntity])
    const scheduleStorage = generateSchedules()
    const appointmentStorage = new FakeAppointmentStorage([new AppointmentDto(1, PATIENT_ID + 1, SCHEDULE_ID + 1)])
    patientCanCreateAppointmentsUC = new PatientCanCreateAppointmentsUseCase(patientStorage, scheduleStorage, appointmentStorage)
  })

  const generateSchedules = () => {
    const START_DATE_TIME = dayjs('20-02-2002 02:02:02', 'DD-MM-YYYY HH:mm:ss')
    const scheduleStorage = new FakeScheduleStorage([])
    const scheduleDtos = [
      { id: SCHEDULE_ID, startDateTime: START_DATE_TIME.format(), endDateTime: START_DATE_TIME.add(30, 'minutes').format(), medicId: MEDIC_ID },
      { id: SECOND_SCHEDULE_ID, startDateTime: START_DATE_TIME.add(30, 'minutes').format(), endDateTime: START_DATE_TIME.add(60, 'minutes').format(), medicId: MEDIC_ID }
    ]
    scheduleDtos.forEach((scheduleDto) => {
      scheduleStorage.scheduleDtos.push(new ScheduleDto(scheduleDto.id, scheduleDto.startDateTime, scheduleDto.endDateTime, scheduleDto.medicId))
    })
    return scheduleStorage
  }

  it('should be defined', () => {
    expect(patientCanCreateAppointmentsUC).toBeDefined()
  })

  it('should create appointments', async () => {
    const result = await patientCanCreateAppointmentsUC.createAppointment(PATIENT_ID, SCHEDULE_ID, AppointmentModalities.IN_PERSON)
    expect(result.status).toBeTruthy()
    expect(result.ids.length).toBe(1)
  })

  it('should not create dupplicated appointments', async () => {
    const result = await patientCanCreateAppointmentsUC.createAppointment(PATIENT_ID, SECOND_SCHEDULE_ID, AppointmentModalities.IN_PERSON)
    expect(result.status).toBeFalsy()
    expect(result.ids.length).toBe(0)
  })

  it('should validate if the patient exists', async () => {
    const INVALID_PATIENT_ID = PATIENT_ID + 100
    const result = await patientCanCreateAppointmentsUC.createAppointment(INVALID_PATIENT_ID, SCHEDULE_ID, AppointmentModalities.IN_PERSON)
    expect(result.status).toBeFalsy()
    expect(result.ids.length).toBe(0)
  })

  it('should validate if the schedule exists', async () => {
    const INVALID_SCHEDULE_ID = SCHEDULE_ID + 100
    const result = await patientCanCreateAppointmentsUC.createAppointment(PATIENT_ID, INVALID_SCHEDULE_ID, AppointmentModalities.IN_PERSON)
    expect(result.status).toBeFalsy()
    expect(result.ids.length).toBe(0)
  })
})
