const PatientDto = require('../../dtos/entities/PatientDto')
const AdminCanGetPatientUseCase = require('./AdminCanGetPatient')

class FakePatientStorage {
  #patients

  constructor () {
    this.#patients = []
  }

  get patients () {
    return this.#patients
  }

  create (patientDto) {
    this.#patients.push(patientDto)
  }

  getById (id) {
    return new Promise((resolve) => {
      resolve(this.#patients.find(patientDto => patientDto.id === id))
    })
  }
}

describe('Test admin can get patient use case', () => {
  let AdminCanGetPatientUC = null
  let patientStorage = null

  beforeEach(() => {
    patientStorage = generatePatientStorage()
    AdminCanGetPatientUC = new AdminCanGetPatientUseCase(patientStorage)
  })

  const generatePatientStorage = () => {
    patientStorage = new FakePatientStorage()
    const patients = [
      {
        id: 1,
        name: 'Nombre del Paciente',
        curp: 'CURP123456789',
        birthDate: '1990-01-01',
        email: 'patiento@example.com',
        phone: '123-456-7890',
        address: 'Dirección del Paciente',
        age: 21,
        genre: 'Femenino',
        password: 'contraseña123',
        blocked: false
      }
    ]
    patients.forEach((user) => {
      patientStorage.create(new PatientDto(
        user.id,
        user.name,
        user.curp,
        user.birthDate,
        user.email,
        user.phone,
        user.address,
        user.age,
        user.genre,
        user.password,
        user.blocked
      ))
    })
    return patientStorage
  }

  it('should be defined', () => {
    expect(AdminCanGetPatientUC).toBeDefined()
  })

  it('should get a patient', async () => {
    const id = 1
    const GetPatientResDto = await AdminCanGetPatientUC.get(id)
    expect(GetPatientResDto.status).toBeTruthy()
    expect(GetPatientResDto.dto.id).toBe(id)
  })

  it('should fail to get a non-existing patient', async () => {
    const id = 10
    const GetPatientResDto = await AdminCanGetPatientUC.get(id)
    expect(GetPatientResDto.status).toBeFalsy()
    expect(GetPatientResDto.message).toBeDefined()
  })
})
