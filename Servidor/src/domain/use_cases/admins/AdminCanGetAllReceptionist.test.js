const ReceptionistDto = require('../../dtos/ReceptionistDto')
const AdminCanGetAllReceptionistUseCase = require('./AdminCanGetAllReceptionist')

class FakeReceptionistStorage {
  #receptionists

  constructor () {
    this.#receptionists = []
  }

  get receptionists () {
    return this.#receptionists
  }

  create (receptionistDto) {
    this.#receptionists.push(receptionistDto)
  }

  getAll (isBlocked) {
    return new Promise((resolve) => {
      resolve(this.#receptionists.filter(receptionistDto => receptionistDto.blocked === isBlocked))
    })
  }
}

describe('Test admin can get all receptionists use case', () => {
  let AdminCanGetAllReceptionistUC = null
  let receptionistStorage = null

  beforeEach(() => {
    receptionistStorage = generateReceptionistStorage()
    AdminCanGetAllReceptionistUC = new AdminCanGetAllReceptionistUseCase(receptionistStorage)
  })

  const generateReceptionistStorage = () => {
    receptionistStorage = new FakeReceptionistStorage()
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
        blocked: true
      },
      {
        id: 3,
        name: 'Recepcionista Tres',
        curp: 'CURP333333333',
        birthDate: '1970-12-30',
        email: 'receptionistotres@example.com',
        phone: '333-333-3333',
        address: 'Dirección del Recepcionista Tres',
        password: 'contraseña789',
        blocked: false
      },
      {
        id: 4,
        name: 'Recepcionista Cuatro',
        curp: 'CURP444444444',
        birthDate: '1982-08-20',
        email: 'receptionistocuatro@example.com',
        phone: '444-444-4444',
        address: 'Dirección del Recepcionista Cuatro',
        password: 'contraseña789',
        blocked: true
      }
    ]
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
    expect(AdminCanGetAllReceptionistUC).toBeDefined()
  })

  it('should get all blocked receptionists', async () => {
    const isBlocked = true
    const GetAllReceptionistResDto = await AdminCanGetAllReceptionistUC.getAll(isBlocked)
    expect(GetAllReceptionistResDto.status).toBeTruthy()
    GetAllReceptionistResDto.dtos.forEach(receptionist => {
      expect(receptionist.blocked).toBe(isBlocked)
    })
  })

  it('should get all not blocked receptionists', async () => {
    const isBlocked = false
    const GetAllReceptionistResDto = await AdminCanGetAllReceptionistUC.getAll(isBlocked)
    expect(GetAllReceptionistResDto.status).toBeTruthy()
    GetAllReceptionistResDto.dtos.forEach(receptionist => {
      expect(receptionist.blocked).toBe(isBlocked)
    })
  })
})
