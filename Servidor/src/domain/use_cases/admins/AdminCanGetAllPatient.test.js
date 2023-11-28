const PatientDto = require('../../dtos/entities/PatientDto')
const AdminCanGetAllPatientUseCase = require('./AdminCanGetAllPatient')

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

  getAll (isBlocked) {
    return new Promise((resolve) => {
      resolve(this.#patients.filter(patientDto => patientDto.blocked === isBlocked))
    })
  }
}

describe('Test admin can get all patients use case', () => {
  let AdminCanGetAllPatientUC = null
  let patientStorage = null

  beforeEach(() => {
    patientStorage = generatePatientStorage()
    AdminCanGetAllPatientUC = new AdminCanGetAllPatientUseCase(patientStorage)
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
        blocked: true
      },
      {
        id: 3,
        name: 'Paciente Tres',
        curp: 'CURP333333333',
        birthDate: '1970-12-30',
        email: 'patientotres@example.com',
        phone: '333-333-3333',
        address: 'Dirección del Paciente Tres',
        age: 22,
        genre: 'Masculino',
        password: 'contraseña789',
        blocked: false
      },
      {
        id: 4,
        name: 'Paciente Cuatro',
        curp: 'CURP444444444',
        birthDate: '1982-08-20',
        email: 'patientocuatro@example.com',
        phone: '444-444-4444',
        address: 'Dirección del Paciente Cuatro',
        age: 22,
        genre: 'Masculino',
        password: 'contraseña789',
        blocked: true
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
    expect(AdminCanGetAllPatientUC).toBeDefined()
  })

  it('should get all blocked patients', async () => {
    const isBlocked = true
    const GetAllPatientResDto = await AdminCanGetAllPatientUC.getAll(isBlocked)
    expect(GetAllPatientResDto.status).toBeTruthy()
    GetAllPatientResDto.dtos.forEach(patient => {
      expect(patient.blocked).toBe(isBlocked)
    })
  })

  it('should get all not blocked patients', async () => {
    const isBlocked = false
    const GetAllPatientResDto = await AdminCanGetAllPatientUC.getAll(isBlocked)
    expect(GetAllPatientResDto.status).toBeTruthy()
    GetAllPatientResDto.dtos.forEach(patient => {
      expect(patient.blocked).toBe(isBlocked)
    })
  })
})
