const MedicDto = require('../../dtos/entities/MedicDto')
const AdminCanGetMedicUseCase = require('./AdminCanGetMedic')

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

  findById (id) {
    return new Promise((resolve) => {
      resolve(this.#medics.find(medicDto => medicDto.id === id))
    })
  }
}

describe('Test admin can get medic use case', () => {
  let AdminCanGetMedicUC = null
  let medicStorage = null

  beforeEach(() => {
    medicStorage = generateMedicStorage()
    AdminCanGetMedicUC = new AdminCanGetMedicUseCase(medicStorage)
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
    expect(AdminCanGetMedicUC).toBeDefined()
  })

  it('should get a medic', async () => {
    const id = 4
    const GetMedicResDto = await AdminCanGetMedicUC.get(id)
    expect(GetMedicResDto.status).toBeTruthy()
    expect(GetMedicResDto.dto.id).toBe(id)
  })

  it('should fail to get a non-existing medic', async () => {
    const id = 10
    const GetMedicResDto = await AdminCanGetMedicUC.get(id)
    expect(GetMedicResDto.status).toBeFalsy()
    expect(GetMedicResDto.message).toBeDefined()
  })
})
