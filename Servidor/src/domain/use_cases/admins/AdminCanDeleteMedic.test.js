const MedicDto = require('../../dtos/entities/MedicDto')
const AdminCanDeleteMedicUseCase = require('./AdminCanDeleteMedic')

class FakeMedicStorage {
  #medics

  constructor () {
    this.#medics = []
  }

  get medics () {
    return this.#medics
  }

  create (medicDto) {
    this.#medics.push(medicDto)
  }

  delete (id) {
    const medicToDelete = this.#medics.find(medicDto => medicDto.id === id)
    if (medicToDelete) {
      this.#medics = this.#medics.filter(medicDto => medicDto.id !== id)
      return true
    }
    return false
  }
}

describe('Test admin can delete medic use case', () => {
  let AdminCanDeleteMedicUC = null
  let medicStorage = null

  beforeEach(() => {
    medicStorage = generateMedicStorage()
    AdminCanDeleteMedicUC = new AdminCanDeleteMedicUseCase(medicStorage)
  })

  const generateMedicStorage = () => {
    medicStorage = new FakeMedicStorage()
    const medics = [
      {
        id: 4,
        name: 'Médico Cuatro',
        curp: 'CURP444444444',
        birthDate: '1982-08-20',
        email: 'medicocuatro@example.com',
        phone: '444-444-4444',
        address: 'Dirección del Médico Cuatro',
        specialityId: 101,
        office: 'Número de Oficina 4',
        professionalId: 'ProfID101',
        password: 'contraseña101',
        blocked: true
      }
    ]
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
    expect(AdminCanDeleteMedicUC).toBeDefined()
  })

  it('should delete a medic', async () => {
    const id = 4
    const DeleteMedicResDto = await AdminCanDeleteMedicUC.delete(id)
    expect(DeleteMedicResDto.status).toBeTruthy()
  })

  it('should fail when delete a medic', async () => {
    const id = 10
    const DeleteMedicResDto = await AdminCanDeleteMedicUC.delete(id)
    expect(DeleteMedicResDto.status).toBeFalsy()
  })
})
