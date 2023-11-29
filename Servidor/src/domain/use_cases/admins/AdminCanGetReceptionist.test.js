const ReceptionistDto = require('../../dtos/ReceptionistDto')
const AdminCanGetReceptionistUseCase = require('./AdminCanGetReceptionist')

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

  findById (id) {
    return new Promise((resolve) => {
      resolve(this.#receptionists.find(receptionistDto => receptionistDto.id === id))
    })
  }
}

describe('Test admin can get receptionist use case', () => {
  let AdminCanGetReceptionistUC = null
  let receptionistStorage = null

  beforeEach(() => {
    receptionistStorage = generateReceptionistStorage()
    AdminCanGetReceptionistUC = new AdminCanGetReceptionistUseCase(receptionistStorage)
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
        blocked: false
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
    expect(AdminCanGetReceptionistUC).toBeDefined()
  })

  it('should get a receptionist', async () => {
    const id = 1
    const GetReceptionistResDto = await AdminCanGetReceptionistUC.get(id)
    expect(GetReceptionistResDto.status).toBeTruthy()
    expect(GetReceptionistResDto.dto.id).toBe(id)
  })

  it('should fail to get a non-existing receptionist', async () => {
    const id = 10
    const GetReceptionistResDto = await AdminCanGetReceptionistUC.get(id)
    expect(GetReceptionistResDto.status).toBeFalsy()
    expect(GetReceptionistResDto.message).toBeDefined()
  })
})
