const MedicDto = require('../../dtos/entities/MedicDto')
const AdminCanGetAllMedicUseCase = require('./AdminCanGetAllMedic')

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

  getAll (isBlocked) {
    return new Promise((resolve) => {
      resolve(this.#medics.filter(medicDto => medicDto.blocked === isBlocked))
    })
  }
}

describe('Test admin can get all medics use case', () => {
  let AdminCanGetAllMedicUC = null
  let medicStorage = null

  beforeEach(() => {
    medicStorage = generateMedicStorage()
    AdminCanGetAllMedicUC = new AdminCanGetAllMedicUseCase(medicStorage)
  })

  const generateMedicStorage = () => {
    medicStorage = new FakeMedicStorage()
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
        id: 3,
        name: 'Médico Tres',
        curp: 'CURP333333333',
        birthDate: '1970-12-30',
        email: 'medicotres@example.com',
        phone: '333-333-3333',
        address: 'Dirección del Médico Tres',
        specialityId: 789,
        office: 'Número de Oficina 3',
        professionalId: 'ProfID789',
        password: 'contraseña789',
        blocked: false
      },
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
    expect(AdminCanGetAllMedicUC).toBeDefined()
  })

  it('should get all blocked medics', async () => {
    const isBlocked = true
    const GetAllMedicResDto = await AdminCanGetAllMedicUC.getAll(isBlocked)
    expect(GetAllMedicResDto.status).toBeTruthy()
    GetAllMedicResDto.medics.forEach(medic => {
      expect(medic.blocked).toBe(isBlocked)
    })
  })

  it('should get all not blocked medics', async () => {
    const isBlocked = false
    const GetAllMedicResDto = await AdminCanGetAllMedicUC.getAll(isBlocked)
    expect(GetAllMedicResDto.status).toBeTruthy()
    GetAllMedicResDto.medics.forEach(medic => {
      expect(medic.blocked).toBe(isBlocked)
    })
  })
})
