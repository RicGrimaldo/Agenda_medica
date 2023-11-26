const MedicDto = require('../dtos/entities/MedicDto')
const MedicEntity = require('../entities/MedicEntity')
const MedicMapper = require('./MedicMapper')

describe('Test MedicMapper', () => {
  const medicMapper = new MedicMapper()
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
  const medicEntity = new MedicEntity(
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
  const medicDto = medicMapper.format(medicEntity)

  it('should be defined', () => {
    expect(medicMapper).toBeDefined()
  })

  it('should transform the output', () => {
    expect(medicDto instanceof MedicDto).toBeTruthy()
  })

  it('should have the same data', () => {
    expect(medicDto.id).toBe(ID)
    expect(medicDto.name).toBe(NAME)
    expect(medicDto.curp).toBe(CURP)
    expect(medicDto.birthDate).toBe(BIRTH_DATE)
    expect(medicDto.email).toBe(EMAIL)
    expect(medicDto.phone).toBe(PHONE)
    expect(medicDto.address).toBe(ADDRESS)
    expect(medicDto.specialityId).toBe(SPECIALITY_ID)
    expect(medicDto.office).toBe(OFFICE)
    expect(medicDto.professionalId).toBe(PROFESSIONAL_ID)
    expect(medicDto.password).toBe(PASSWORD)
    expect(medicDto.blocked).toBe(BLOCKED)
  })
})
