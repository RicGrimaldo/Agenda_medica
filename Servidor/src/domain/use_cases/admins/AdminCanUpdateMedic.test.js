const MedicDto = require('../../dtos/entities/MedicDto')
const AdminCanUpdateMedicUseCase = require('./AdminCanUpdateMedic')

class FakeUserStorage {
  #userDtos

  constructor () {
    this.#userDtos = []
  }

  get userDtos () {
    return this.#userDtos
  }

  addUserDto (userDto) {
    this.userDtos.push(userDto)
  }

  findByEmail (email) {
    return new Promise((resolve) => {
      resolve(this.userDtos.find(userDto => userDto.email === email))
    })
  }
}

class FakeMedicStorage {
  #medics

  constructor () {
    this.#medics = []
  }

  create (medicDto) {
    this.#medics.push(medicDto)
  }

  update (id, medicDto) {
    const index = this.#medics.findIndex(medic => medic.id === id)
    this.#medics[index] = medicDto
    return { result: true, message: 'Médico actualizado.' }
  }
}

describe('Test admin can update medics use case', () => {
  const NAME = 'Nombre del Médico'
  const CURP = 'CURP123456789'
  const BIRTH_DATE = '1990-01-01'
  const EMAIL = 'email@mail.com'
  const DUPLICATE_EMAIL = 'medico@example.com'
  const PHONE = '123-456-7890'
  const ADDRESS = 'Dirección del Médico'
  const SPECIALITY_ID = 123
  const OFFICE = 'Número de Oficina'
  const PROFESSIONAL_ID = 'ProfID123'
  const PASSWORD = 'contraseña123'
  const BLOCKED = false
  const MEDIC_DTO = new MedicDto(1, NAME, CURP, BIRTH_DATE, EMAIL, PHONE, ADDRESS, SPECIALITY_ID, OFFICE, PROFESSIONAL_ID, PASSWORD, BLOCKED)
  const DUPLICATE_EMAIL_MEDIC_DTO = new MedicDto(2, NAME, CURP, BIRTH_DATE, DUPLICATE_EMAIL, PHONE, ADDRESS, SPECIALITY_ID, OFFICE, PROFESSIONAL_ID, PASSWORD, BLOCKED)
  let AdminCanUpdateMedicUC = null
  let userStorage = null
  let medicStorage = null
  const medics = [
    {
      id: 1,
      name: 'Nombre del Médico',
      curp: 'CURP123456789',
      birthDate: '1990-01-01',
      email: 'medico@example.com',
      phone: '123-456-7890',
      address: 'Dirección del Médico',
      specialityId: 123,
      office: 'Número de Oficina',
      professionalId: 'ProfID123',
      password: 'contraseña123',
      blocked: false
    },
    {
      id: 2,
      name: 'Nombre del Médico',
      curp: 'CURP123456789',
      birthDate: '1990-01-01',
      email: 'medico2@example.com',
      phone: '123-456-7890',
      address: 'Dirección del Médico',
      specialityId: 123,
      office: 'Número de Oficina',
      professionalId: 'ProfID123',
      password: 'contraseña123',
      blocked: false
    }
  ]

  beforeEach(() => {
    userStorage = generateUserStorage()
    medicStorage = generateMedicStorage()
    AdminCanUpdateMedicUC = new AdminCanUpdateMedicUseCase(userStorage, medicStorage)
  })

  const generateUserStorage = () => {
    userStorage = new FakeUserStorage()
    medics.forEach((user) => {
      userStorage.addUserDto(new MedicDto(
        user.id,
        user.name,
        user.curp,
        user.birthDate,
        user.email,
        user.phone,
        user.address,
        user.specialityId,
        user.office,
        user.professionalId,
        user.password,
        user.blocked
      ))
    })
    return userStorage
  }

  const generateMedicStorage = () => {
    medicStorage = new FakeMedicStorage()
    medics.forEach((user) => {
      medicStorage.create(new MedicDto(
        user.id,
        user.name,
        user.curp,
        user.birthDate,
        user.email,
        user.phone,
        user.address,
        user.specialityId,
        user.office,
        user.professionalId,
        user.password,
        user.blocked
      ))
    })
    return medicStorage
  }

  it('should be defined', () => {
    expect(AdminCanUpdateMedicUC).toBeDefined()
  })

  it('should update a medic', async () => {
    const UpdateMedicResDto = await AdminCanUpdateMedicUC.update(MEDIC_DTO.id, MEDIC_DTO)
    expect(UpdateMedicResDto.status).toBeTruthy()
  })

  it('should fail when updating a medic', async () => {
    const UpdateMedicResDto = await AdminCanUpdateMedicUC.update(DUPLICATE_EMAIL_MEDIC_DTO.id, DUPLICATE_EMAIL_MEDIC_DTO)
    expect(UpdateMedicResDto.status).toBeFalsy()
  })
})
