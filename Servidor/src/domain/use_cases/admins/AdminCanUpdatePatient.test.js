const PatientDto = require('../../dtos/entities/PatientDto')
const AdminCanUpdatePatientUseCase = require('./AdminCanUpdatePatient')
const AppointmentDto = require('../../dtos/AppointmentDto')
const AppointmentModalities = require('../../constants/AppointmentModalities')

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
    return { status: true, message: 'Paciente actualizado.' }
  }
}

class FakeAppointmentStorage {
  #appointments

  constructor () {
    this.#appointments = []
  }

  get appointments () {
    return this.#appointments
  }

  create (appointmentDto) {
    this.#appointments.push(appointmentDto)
  }

  releaseByPatientId (patientId) {
    this.#appointments.forEach(appointment => {
      if (appointment.patientId === patientId) {
        appointment.patientId = null
        appointment.modality = null
      }
    })
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
  const APPOINTMENT_DTOS = [
    new AppointmentDto(1, null, 1, AppointmentModalities.IN_PERSON, '', 1),
    new AppointmentDto(2, null, 2, AppointmentModalities.WEB, '', 1),
    new AppointmentDto(3, null, 6, AppointmentModalities.ON_TELEPHONE, '', 1),
    new AppointmentDto(4, null, 10, AppointmentModalities.IN_PERSON, '')
  ]
  let AdminCanUpdatePatientUC = null
  let userStorage = null
  let patientStorage = null
  let appointmentStorage = null
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
    appointmentStorage = generateAppointmentStorage()
    AdminCanUpdatePatientUC = new AdminCanUpdatePatientUseCase(userStorage, patientStorage, appointmentStorage)
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

  const generateAppointmentStorage = () => {
    appointmentStorage = new FakeAppointmentStorage()
    appointmentStorage.create(...APPOINTMENT_DTOS)
    return appointmentStorage
  }

  it('should be defined', () => {
    expect(AdminCanUpdatePatientUC).toBeDefined()
  })

  it('should update a patient', async () => {
    const UpdatePatientResDto = await AdminCanUpdatePatientUC.update(PATIENT_DTO.id, PATIENT_DTO)
    expect(UpdatePatientResDto.status).toBeTruthy()
    appointmentStorage.appointments.forEach(appointment => {
      if (appointment.patientId === PATIENT_DTO.id) {
        expect(appointment.patientId).toBeNull()
        expect(appointment.modality).toBeNull()
      }
    })
  })

  it('should fail when updating a patient', async () => {
    const UpdatePatientResDto = await AdminCanUpdatePatientUC.update(DUPLICATE_EMAIL_PATIENT_DTO.id, DUPLICATE_EMAIL_PATIENT_DTO)
    expect(UpdatePatientResDto.status).toBeFalsy()
  })
})
