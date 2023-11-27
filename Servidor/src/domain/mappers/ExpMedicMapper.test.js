const SpecialityDto = require('../dtos/SpecialityDto')
const ExpMedicDto = require('../dtos/expanded/ExpMedicDto')
const MedicEntity = require('../entities/MedicEntity')
const ExpMedicMapper = require('./ExpMedicMapper')

describe('Test ExpMedicDto', () => {
  const expMedicMapper = new ExpMedicMapper()
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
  const expMedicDto = expMedicMapper.format(medicEntity, new SpecialityDto(1, 'S', 'Speciality'))

  it('should be defined', () => {
    expect(expMedicMapper).toBeDefined()
  })

  it('should transform the output', () => {
    expect(expMedicDto instanceof ExpMedicDto).toBeTruthy()
  })

  it('should have the same data', () => {
    expect(expMedicDto.id).toBe(ID)
    expect(expMedicDto.name).toBe(NAME)
    expect(expMedicDto.curp).toBe(CURP)
    expect(expMedicDto.birthDate).toBe(BIRTH_DATE)
    expect(expMedicDto.email).toBe(EMAIL)
    expect(expMedicDto.phone).toBe(PHONE)
    expect(expMedicDto.address).toBe(ADDRESS)
    expect(expMedicDto.specialityId).toBe(SPECIALITY_ID)
    expect(expMedicDto.office).toBe(OFFICE)
    expect(expMedicDto.professionalId).toBe(PROFESSIONAL_ID)
    expect(expMedicDto.password).toBe(PASSWORD)
    expect(expMedicDto.blocked).toBe(BLOCKED)
    expect(expMedicDto.specialityDto instanceof SpecialityDto).toBeTruthy()
  })
})
