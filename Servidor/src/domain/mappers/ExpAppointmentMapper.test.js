const dayjs = require('dayjs')
const Genres = require('../constants/Genres')
const ScheduleDto = require('../dtos/ScheduleDto')
const ExpAppointmentDto = require('../dtos/expanded/ExpAppointmentDto')
const MedicEntity = require('../entities/MedicEntity')
const PatientEntity = require('../entities/PatientEntity')
const ExpAppointmentMapper = require('./ExpAppointmentMapper')
const AppointmentModalities = require('../constants/AppointmentModalities')
const AppointmentDto = require('../dtos/AppointmentDto')
const PatientDto = require('../dtos/entities/PatientDto')
const MedicDto = require('../dtos/entities/MedicDto')

describe('Test PatientMapper', () => {
  const expAppointmentMapper = new ExpAppointmentMapper()
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
  const generateScheduleDto = () => {
    const ID = 1
    const startDateTime = dayjs('20-02-2002 02:02:02', 'DD-MM-YYYY HH:mm:ss')
    const endDateTime = startDateTime.add(20, 'minutes')
    return new ScheduleDto(
      ID,
      startDateTime.format(),
      endDateTime.format(),
      1
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
  const generateAppointmentDto = () => {
    const ID = 1
    const PATIENT_ID = 1
    const SCHEDULE_ID = 1
    const MODALITY = AppointmentModalities.ON_TELEPHONE
    return new AppointmentDto(
      ID,
      PATIENT_ID,
      SCHEDULE_ID,
      MODALITY
    )
  }
  const patientEntity = generatePatientEntity()
  const scheduleDto = generateScheduleDto()
  const medicEntity = generateMedicEntity()
  const appointmentDto = generateAppointmentDto()
  const expAppointmentDto = expAppointmentMapper.format(patientEntity, scheduleDto, medicEntity, appointmentDto)

  it('should be defined', () => {
    expect(expAppointmentMapper).toBeDefined()
  })

  it('should transform the output', () => {
    expect(expAppointmentDto instanceof ExpAppointmentDto).toBeTruthy()
  })

  it('should have the same data', () => {
    expect(expAppointmentDto.id).toBe(appointmentDto.id)
    expect(expAppointmentDto.patientId).toBe(appointmentDto.patientId)
    expect(expAppointmentDto.scheduleId).toBe(appointmentDto.scheduleId)
    expect(expAppointmentDto.modality).toBe(appointmentDto.modality)
    expect(expAppointmentDto.patientDto instanceof PatientDto).toBeTruthy()
    expect(expAppointmentDto.scheduleDto instanceof ScheduleDto).toBeTruthy()
    expect(expAppointmentDto.medicDto instanceof MedicDto).toBeTruthy()
  })
})
