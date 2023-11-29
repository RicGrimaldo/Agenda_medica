const ReceptionistDto = require('../../dtos/ReceptionistDto')
const AdminCanCreateReceptionistUseCase = require('./AdminCanCreateReceptionist')

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

class FakeReceptionistStorage {
  #receptionists

  constructor () {
    this.#receptionists = []
  }

  create (receptionistDto) {
    this.#receptionists.push(receptionistDto)
    return { result: true, message: '¡Recepcionista agregado!' }
  }
}

describe('Test admin can create receptionists use case', () => {
  const ID = 10
  const NAME = 'Nombre del Recepcionista'
  const CURP = 'CURP123456789'
  const BIRTH_DATE = '1990-01-01'
  const EMAIL = 'email@mail.com'
  const PHONE = '123-456-7890'
  const ADDRESS = 'Dirección del Recepcionista'
  const PASSWORD = 'contraseña123'
  const BLOCKED = false
  const RECEPTIONIST_DTO = new ReceptionistDto(ID, NAME, CURP, BIRTH_DATE, EMAIL, PHONE, ADDRESS, PASSWORD, BLOCKED)
  const DUPLICATE_EMAIL_RECEPTIONIST_DTO = new ReceptionistDto(ID, NAME, CURP, BIRTH_DATE, 'receptionisto@example.com', PHONE, ADDRESS, PASSWORD, BLOCKED)
  let AdminCanCreateReceptionistUC = null
  let userStorage = null
  let receptionistStorage = null

  beforeEach(() => {
    userStorage = generateUserStorage()
    receptionistStorage = generateReceptionistStorage()
    AdminCanCreateReceptionistUC = new AdminCanCreateReceptionistUseCase(userStorage, receptionistStorage)
  })

  const generateUserStorage = () => {
    userStorage = new FakeUserStorage()
    const receptionists = [
      {
        id: 1,
        name: 'Nombre del Recepcionista',
        curp: 'CURP123456789',
        birthDate: '1990-01-01',
        email: 'receptionisto@example.com',
        phone: '123-456-7890',
        address: 'Dirección del Recepcionista',
        password: 'contraseña123',
        blocked: false
      }
    ]
    receptionists.forEach((user) => {
      userStorage.addUserDto(new ReceptionistDto(
        user.id,
        user.name,
        user.curp,
        user.birthDate,
        user.email,
        user.phone,
        user.address,
        user.password,
        user.blocked
      ))
    })
    return userStorage
  }

  const generateReceptionistStorage = () => {
    receptionistStorage = new FakeReceptionistStorage()
    return receptionistStorage
  }

  it('should be defined', () => {
    expect(AdminCanCreateReceptionistUC).toBeDefined()
  })

  it('should create a receptionist', async () => {
    const CreateReceptionistResDto = await AdminCanCreateReceptionistUC.create(RECEPTIONIST_DTO)
    expect(CreateReceptionistResDto.status).toBeTruthy()
  })

  it('should fail when creating a receptionist', async () => {
    const CreateReceptionistResDto = await AdminCanCreateReceptionistUC.create(DUPLICATE_EMAIL_RECEPTIONIST_DTO)
    expect(CreateReceptionistResDto.status).toBeFalsy()
  })
})
