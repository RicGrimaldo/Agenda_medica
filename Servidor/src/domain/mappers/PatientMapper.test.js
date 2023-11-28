const Genres = require('../constants/Genres')
const PatientDto = require('../dtos/entities/PatientDto')
const PatientEntity = require('../entities/PatientEntity')
const PatientMapper = require('./PatientMapper')

describe('Test PatientMapper', () => {
  const patientMapper = new PatientMapper()
  const ID = 1
  const NAME = 'John Doe'
  const CURP = 'ABC123'
  const BIRTH_DATE = '1990-01-01'
  const EMAIL = 'john.doe@example.com'
  const PHONE = 99999999
  const ADDRESS = '123 Main St'
  const AGE = 22
  const GENRE = Genres.Maculine
  const PASSWORD = 'password123'
  const BLOCKED = false
  const patientEntity = new PatientEntity(
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
  const patientDto = patientMapper.format(patientEntity)

  it('should be defined', () => {
    expect(patientMapper).toBeDefined()
  })

  it('should transform the output', () => {
    expect(patientDto instanceof PatientDto).toBeTruthy()
  })

  it('should have the same data', () => {
    expect(patientDto.id).toBe(ID)
    expect(patientDto.name).toBe(NAME)
    expect(patientDto.curp).toBe(CURP)
    expect(patientDto.birthDate).toBe(BIRTH_DATE)
    expect(patientDto.email).toBe(EMAIL)
    expect(patientDto.phone).toBe(PHONE)
    expect(patientDto.address).toBe(ADDRESS)
    expect(patientDto.age).toBe(AGE)
    expect(patientDto.genre).toBe(GENRE)
    expect(patientDto.password).toBe(PASSWORD)
    expect(patientDto.blocked).toBe(BLOCKED)
  })
})
