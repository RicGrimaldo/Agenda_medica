const PatientDto = require('../../dtos/entities/PatientDto')
const AdminCanUpdatePatientUseCase = require('./AdminCanUpdatePatient')

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
  }

  update (id, patientDto) {
    const index = this.#patients.findIndex(patient => patient.id === id)
    this.#patients[index] = patientDto
    return { result: true, message: 'Paciente actualizado.' }
  }
}

describe('Test admin can update patients use case', () => {
  const NAME = 'Nombre del Paciente'
  const CURP = 'CURP123456789'
  const BIRTH_DATE = '1990-01-01'
  const EMAIL = 'email@mail.com'
  const DUPLICATE_EMAIL = 'patiento@example.com'
  const PHONE = '123-456-7890'
  const ADDRESS = 'Dirección del Paciente'
  const AGE = 22
  const GENRE = 'Masculino'
  const PASSWORD = 'contraseña123'
  const BLOCKED = false
  const PATIENT_DTO = new PatientDto(1, NAME, CURP, BIRTH_DATE, EMAIL, PHONE, ADDRESS, AGE, GENRE, PASSWORD, BLOCKED)
  const DUPLICATE_EMAIL_PATIENT_DTO = new PatientDto(2, NAME, CURP, BIRTH_DATE, DUPLICATE_EMAIL, PHONE, ADDRESS, AGE, GENRE, PASSWORD, BLOCKED)
  let AdminCanUpdatePatientUC = null
  let userStorage = null
  let patientStorage = null
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
    },
    {
      id: 2,
      name: 'Nombre del Paciente',
      curp: 'CURP123456789',
      birthDate: '1990-01-01',
      email: 'patiento2@example.com',
      phone: '123-456-7890',
      address: 'Dirección del Paciente',
      age: 22,
      genre: 'Masculino',
      password: 'contraseña123',
      blocked: false
    }
  ]

  beforeEach(() => {
    userStorage = generateUserStorage()
    patientStorage = generatePatientStorage()
    AdminCanUpdatePatientUC = new AdminCanUpdatePatientUseCase(userStorage, patientStorage)
  })

  const generateUserStorage = () => {
    userStorage = new FakeUserStorage()
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
    expect(AdminCanUpdatePatientUC).toBeDefined()
  })

  it('should update a patient', async () => {
    const UpdatePatientResDto = await AdminCanUpdatePatientUC.update(PATIENT_DTO.id, PATIENT_DTO)
    expect(UpdatePatientResDto.status).toBeTruthy()
  })

  it('should fail when updating a patient', async () => {
    const UpdatePatientResDto = await AdminCanUpdatePatientUC.update(DUPLICATE_EMAIL_PATIENT_DTO.id, DUPLICATE_EMAIL_PATIENT_DTO)
    expect(UpdatePatientResDto.status).toBeFalsy()
  })
})
