const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
const Genres = require('../../constants/Genres')
const MedicEntity = require('../../entities/MedicEntity')
const PatientEntity = require('../../entities/PatientEntity')
const UserCanRequestIncomingAppointmentsUseCase = require('./UserCanRequestIncomingAppointments')
const ScheduleDto = require('../../dtos/ScheduleDto')
const SpecialityDto = require('../../dtos/SpecialityDto')
const MedicMapper = require('../../mappers/MedicMapper')
const ExpMedicMapper = require('../../mappers/ExpMedicMapper')
const AppointmentDto = require('../../dtos/AppointmentDto')
const ExpAppointmentDto = require('../../dtos/expanded/ExpAppointmentDto')

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

  async getIncoming () {
    return new Promise((resolve) => {
      resolve(this.appointmentDtos)
    })
  }
}

class FakeMedicStorage {
  #expMedicDtos

  constructor (expMedicDtos) {
    this.#expMedicDtos = expMedicDtos
  }

  get expMedicDtos () {
    return this.#expMedicDtos
  }

  async getExpandedById (id) {
    return new Promise((resolve) => {
      resolve(this.expMedicDtos.find((expMedicDto) => expMedicDto.id === id))
    })
  }
}

describe('Test UserCanRequestIncomingAppointmentsUseCase', () => {
  let userCanRequestIncomingAppointmentsUseCase = null

  const generatePatientEntity = () => {
    const ID = 1
    const NAME = 'John Doe'
    const CURP = 'ABC123'
    const BIRTH_DATE = '1990-01-01'
    const EMAIL = 'john.doe@example.com'
    const PHONE = 99999999
    const ADDRESS = '123 Main St'
    const AGE = 22
    const GENRE = Genres.Undefined
    const PASSWORD = 'password123'
    const BLOCKED = false
    return new PatientEntity(
      ID,
      NAME,
      CURP,
      BIRTH_DATE,
      EMAIL,
      PHONE,
      ADDRESS,
      AGE,
      GENRE,
      PASSWORD,
      BLOCKED,
      []
    )
  }
  const generateMedicEntity = () => {
    const ID = 1
    const NAME = 'Dr. Smith'
    const CURP = 'XYZ456'
    const BIRTH_DATE = '1980-05-15'
    const EMAIL = 'dr.smith@example.com'
    const PHONE = 99999998
    const ADDRESS = '789 Medical St'
    const SPECIALITY_ID = 2
    const OFFICE = 'Clinic A'
    const PROFESSIONAL_ID = 123
    const PASSWORD = 'PRO123'
    const BLOCKED = false
    return new MedicEntity(
      ID,
      NAME,
      CURP,
      BIRTH_DATE,
      EMAIL,
      PHONE,
      ADDRESS,
      SPECIALITY_ID,
      OFFICE,
      PROFESSIONAL_ID,
      PASSWORD,
      BLOCKED,
      []
    )
  }
  const generateScheduleStorage = () => {
    const START_DATE_TIME = dayjs('20-02-2002 02:02:02', 'DD-MM-YYYY HH:mm:ss')
    const scheduleStorage = new FakeScheduleStorage([])
    const scheduleDtos = [
      { id: 1, startDateTime: START_DATE_TIME.format(), endDateTime: START_DATE_TIME.add(30, 'minutes').format(), medicId: 1 },
      { id: 2, startDateTime: START_DATE_TIME.add(30, 'minutes').format(), endDateTime: START_DATE_TIME.add(60, 'minutes').format(), medicId: 1 }
    ]
    scheduleDtos.forEach((scheduleDto) => {
      scheduleStorage.scheduleDtos.push(new ScheduleDto(scheduleDto.id, scheduleDto.startDateTime, scheduleDto.endDateTime, scheduleDto.medicId))
    })
    return scheduleStorage
  }
  const generateSpecialityDto = () => {
    const ID = 1
    const ACRONYM = 'S'
    const NAME = 'Speciality'
    return new SpecialityDto(ID, ACRONYM, NAME)
  }

  beforeEach(() => {
    const patientStorage = new FakePatientStorage([generatePatientEntity()])
    const scheduleStorage = generateScheduleStorage()
    const appointmentStorage = new FakeAppointmentStorage([new AppointmentDto(1, 1, 1, '')])
    const medicDto = new MedicMapper().format(generateMedicEntity())
    const expMedicDto = new ExpMedicMapper().format(medicDto, generateSpecialityDto())
    const medicStorage = new FakeMedicStorage([expMedicDto])
    userCanRequestIncomingAppointmentsUseCase = new UserCanRequestIncomingAppointmentsUseCase(
      patientStorage,
      scheduleStorage,
      appointmentStorage,
      medicStorage
    )
  })

  it('should be defined', () => {
    expect(userCanRequestIncomingAppointmentsUseCase).toBeDefined()
  })

  it('should return incoming appointments', async () => {
    const result = await userCanRequestIncomingAppointmentsUseCase.getIncomingAppointments()
    expect(result).toBeDefined()
    expect(result.length).toBe(1)
    expect(result[0] instanceof ExpAppointmentDto).toBeTruthy()
  })
})
