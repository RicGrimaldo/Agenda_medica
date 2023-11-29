const ReceptionistDto = require('../../dtos/ReceptionistDto')
const AdminCanUpdateReceptionistUseCase = require('./AdminCanUpdateReceptionist')

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
  }

  update (id, receptionistDto) {
    const index = this.#receptionists.findIndex(receptionist => receptionist.id === id)
    this.#receptionists[index] = receptionistDto
    return { result: true, message: 'Recepcionista actualizado.' }
  }
}

describe('Test admin can update receptionists use case', () => {
  const NAME = 'Nombre del Recepcionista'
  const CURP = 'CURP123456789'
  const BIRTH_DATE = '1990-01-01'
  const EMAIL = 'email@mail.com'
  const DUPLICATE_EMAIL = 'receptionisto@example.com'
  const PHONE = '123-456-7890'
  const ADDRESS = 'Dirección del Recepcionista'
  const PASSWORD = 'contraseña123'
  const BLOCKED = false
  const RECEPTIONIST_DTO = new ReceptionistDto(1, NAME, CURP, BIRTH_DATE, EMAIL, PHONE, ADDRESS, PASSWORD, BLOCKED)
  const DUPLICATE_EMAIL_RECEPTIONIST_DTO = new ReceptionistDto(2, NAME, CURP, BIRTH_DATE, DUPLICATE_EMAIL, PHONE, ADDRESS, PASSWORD, BLOCKED)
  let AdminCanUpdateReceptionistUC = null
  let userStorage = null
  let receptionistStorage = null
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
    },
    {
      id: 2,
      name: 'Nombre del Recepcionista',
      curp: 'CURP123456789',
      birthDate: '1990-01-01',
      email: 'receptionisto2@example.com',
      phone: '123-456-7890',
      address: 'Dirección del Recepcionista',
      password: 'contraseña123',
      blocked: false
    }
  ]

  beforeEach(() => {
    userStorage = generateUserStorage()
    receptionistStorage = generateReceptionistStorage()
    AdminCanUpdateReceptionistUC = new AdminCanUpdateReceptionistUseCase(userStorage, receptionistStorage)
  })

  const generateUserStorage = () => {
    userStorage = new FakeUserStorage()
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
    receptionists.forEach((user) => {
      receptionistStorage.create(new ReceptionistDto(
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
    return receptionistStorage
  }

  it('should be defined', () => {
    expect(AdminCanUpdateReceptionistUC).toBeDefined()
  })

  it('should update a receptionist', async () => {
    const UpdateReceptionistResDto = await AdminCanUpdateReceptionistUC.update(RECEPTIONIST_DTO.id, RECEPTIONIST_DTO)
    expect(UpdateReceptionistResDto.status).toBeTruthy()
  })

  it('should fail when updating a receptionist', async () => {
    const UpdateReceptionistResDto = await AdminCanUpdateReceptionistUC.update(DUPLICATE_EMAIL_RECEPTIONIST_DTO.id, DUPLICATE_EMAIL_RECEPTIONIST_DTO)
    expect(UpdateReceptionistResDto.status).toBeFalsy()
  })
})
