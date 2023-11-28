const MedicDto = require('../../dtos/entities/MedicDto')
const AdminCanCreateMedicUseCase = require('./AdminCanCreateMedic')

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
    return { result: true, message: '¡Médico agregado!' }
  }
}

describe('Test admin can create medics use case', () => {
  const ID = 10
  const NAME = 'Nombre del Médico'
  const CURP = 'CURP123456789'
  const BIRTH_DATE = '1990-01-01'
  const EMAIL = 'email@mail.com'
  const PHONE = '123-456-7890'
  const ADDRESS = 'Dirección del Médico'
  const SPECIALITY_ID = 123
  const OFFICE = 'Número de Oficina'
  const PROFESSIONAL_ID = 'ProfID123'
  const PASSWORD = 'contraseña123'
  const BLOCKED = false
  const MEDIC_DTO = new MedicDto(ID, NAME, CURP, BIRTH_DATE, EMAIL, PHONE, ADDRESS, SPECIALITY_ID, OFFICE, PROFESSIONAL_ID, PASSWORD, BLOCKED)
  const DUPLICATE_EMAIL_MEDIC_DTO = new MedicDto(ID, NAME, CURP, BIRTH_DATE, 'medico@example.com', PHONE, ADDRESS, SPECIALITY_ID, OFFICE, PROFESSIONAL_ID, PASSWORD, BLOCKED)
  let AdminCanCreateMedicUC = null
  let userStorage = null
  let medicStorage = null

  beforeEach(() => {
    userStorage = generateUserStorage()
    medicStorage = generateMedicStorage()
    AdminCanCreateMedicUC = new AdminCanCreateMedicUseCase(userStorage, medicStorage)
  })

  const generateUserStorage = () => {
    userStorage = new FakeUserStorage()
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
      }
    ]
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
    return medicStorage
  }

  it('should be defined', () => {
    expect(AdminCanCreateMedicUC).toBeDefined()
  })

  it('should create a medic', async () => {
    const CreateMedicResDto = await AdminCanCreateMedicUC.create(MEDIC_DTO)
    expect(CreateMedicResDto.status).toBeTruthy()
  })

  it('should fail when creating a medic', async () => {
    const CreateMedicResDto = await AdminCanCreateMedicUC.create(DUPLICATE_EMAIL_MEDIC_DTO)
    expect(CreateMedicResDto.status).toBeFalsy()
  })
})
