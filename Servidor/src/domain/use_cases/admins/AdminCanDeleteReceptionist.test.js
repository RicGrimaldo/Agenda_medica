const ReceptionistDto = require('../../dtos/ReceptionistDto')
const AdminCanDeleteReceptionistUseCase = require('./AdminCanDeleteReceptionist')

class FakeMedicStorage {
  #receptionists

  constructor () {
    this.#receptionists = []
  }

  create (receptionistDto) {
    this.#receptionists.push(receptionistDto)
  }

  delete (id) {
    const receptionistToDelete = this.#receptionists.find(receptionistDto => receptionistDto.id === id)
    if (receptionistToDelete) {
      this.#receptionists = this.#receptionists.filter(receptionistDto => receptionistDto.id !== id)
      return true
    }
    return false
  }
}

describe('Test admin can delete receptionist use case', () => {
  let AdminCanDeleteReceptionistUC = null
  let receptionistStorage = null

  beforeEach(() => {
    receptionistStorage = generateReceptionistStorage()
    AdminCanDeleteReceptionistUC = new AdminCanDeleteReceptionistUseCase(receptionistStorage)
  })

  const generateReceptionistStorage = () => {
    receptionistStorage = new FakeMedicStorage()
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
    expect(AdminCanDeleteReceptionistUC).toBeDefined()
  })

  it('should delete a receptionist', async () => {
    const id = 1
    const DeleteReceptionistResDto = await AdminCanDeleteReceptionistUC.delete(id)
    expect(DeleteReceptionistResDto.status).toBeTruthy()
  })

  it('should fail when delete a receptionist', async () => {
    const id = 10
    const DeleteReceptionistResDto = await AdminCanDeleteReceptionistUC.delete(id)
    expect(DeleteReceptionistResDto.status).toBeFalsy()
  })
})
