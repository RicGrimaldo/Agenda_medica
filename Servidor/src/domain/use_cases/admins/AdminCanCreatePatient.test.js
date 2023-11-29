const PatientDto = require('../../dtos/entities/PatientDto')
const AdminCanCreatePatientUseCase = require('./AdminCanCreatePatient')

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

class FakePatientStorage {
  #patients

  constructor () {
    this.#patients = []
  }

  create (patientDto) {
    this.#patients.push(patientDto)
    return { result: true, message: '¡Paciente agregado!' }
  }
}

describe('Test admin can create patients use case', () => {
  const ID = 10
  const NAME = 'Nombre del Paciente'
  const CURP = 'CURP123456789'
  const BIRTH_DATE = '1990-01-01'
  const EMAIL = 'email@mail.com'
  const PHONE = '123-456-7890'
  const ADDRESS = 'Dirección del Paciente'
  const AGE = 22
  const GENRE = 'Masculino'
  const PASSWORD = 'contraseña123'
  const BLOCKED = false
  const PATIENT_DTO = new PatientDto(ID, NAME, CURP, BIRTH_DATE, EMAIL, PHONE, ADDRESS, AGE, GENRE, PASSWORD, BLOCKED)
  const DUPLICATE_EMAIL_PATIENT_DTO = new PatientDto(ID, NAME, CURP, BIRTH_DATE, 'patiento@example.com', PHONE, ADDRESS, AGE, GENRE, PASSWORD, BLOCKED)
  let AdminCanCreatePatientUC = null
  let userStorage = null
  let patientStorage = null

  beforeEach(() => {
    userStorage = generateUserStorage()
    patientStorage = generatePatientStorage()
    AdminCanCreatePatientUC = new AdminCanCreatePatientUseCase(userStorage, patientStorage)
  })

  const generateUserStorage = () => {
    userStorage = new FakeUserStorage()
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
      userStorage.addUserDto(new PatientDto(
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
    return userStorage
  }

  const generatePatientStorage = () => {
    patientStorage = new FakePatientStorage()
    return patientStorage
  }

  it('should be defined', () => {
    expect(AdminCanCreatePatientUC).toBeDefined()
  })

  it('should create a patient', async () => {
    const CreatePatientResDto = await AdminCanCreatePatientUC.create(PATIENT_DTO)
    expect(CreatePatientResDto.status).toBeTruthy()
  })

  it('should fail when creating a patient', async () => {
    const CreatePatientResDto = await AdminCanCreatePatientUC.create(DUPLICATE_EMAIL_PATIENT_DTO)
    expect(CreatePatientResDto.status).toBeFalsy()
  })
})
