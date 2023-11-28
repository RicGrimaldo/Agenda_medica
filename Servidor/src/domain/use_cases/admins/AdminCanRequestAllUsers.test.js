const Genres = require('../../constants/Genres')
const ReceptionistDto = require('../../dtos/ReceptionistDto')
const MedicDto = require('../../dtos/entities/MedicDto')
const PatientDto = require('../../dtos/entities/PatientDto')
const MedicEntity = require('../../entities/MedicEntity')
const PatientEntity = require('../../entities/PatientEntity')
const AdminCanRequestAllUsersUseCase = require('./AdminCanRequestAllUsers')

class FakeReceptionistStorage {
  #receptionistDtos

  constructor (receptionistDtos) {
    this.#receptionistDtos = receptionistDtos
  }

  get receptionistDtos () {
    return this.#receptionistDtos
  }

  async getAll () {
    return new Promise((resolve) => {
      resolve(this.receptionistDtos)
    })
  }
}

class FakeMedicStorage {
  #medicEntities

  constructor (medicEntities) {
    this.#medicEntities = medicEntities
  }

  get medicEntities () {
    return this.#medicEntities
  }

  async getAll () {
    return new Promise((resolve) => {
      resolve(this.medicEntities)
    })
  }
}

class FakePatientStorage {
  #patientEntities

  constructor (patientEntities) {
    this.#patientEntities = patientEntities
  }

  get patientEntities () {
    return this.#patientEntities
  }

  async getAll () {
    return new Promise((resolve) => {
      resolve(this.patientEntities)
    })
  }
}

describe('Test AdminCanRequestAllUsersUseCase', () => {
  let adminCanRequestAllUsersUC = null

  const generateReceptionistDto = () => {
    const ID = 1
    const NAME = 'Jane Doe'
    const CURP = 'A1ZT3'
    const BIRTH_DATE = '1991-01-01'
    const EMAIL = 'jane.doe@example.com'
    const PHONE = 99999997
    const ADDRESS = '133 Main St'
    const PASSWORD = '12345678'
    const BLOCKED = false
    return new ReceptionistDto(
      ID,
      NAME,
      CURP,
      BIRTH_DATE,
      EMAIL,
      PHONE,
      ADDRESS,
      PASSWORD,
      BLOCKED
    )
  }
  const generatePatientEntity = () => {
    const ID = 1
    const NAME = 'John Doe'
    const CURP = 'ABC123'
    const BIRTH_DATE = '1990-01-01'
    const EMAIL = 'john.doe@example.com'
    const PHONE = 99999999
    const ADDRESS = '123 Main St'
    const AGE = 22
    const GENRE = Genres.Undefined
    const PASSWORD = 'password123'
    const BLOCKED = false
    return new PatientEntity(
      ID,
      NAME,
      CURP,
      BIRTH_DATE,
      EMAIL,
      PHONE,
      ADDRESS,
      AGE,
      GENRE,
      PASSWORD,
      BLOCKED,
      []
    )
  }
  const generateMedicEntity = () => {
    const ID = 1
    const NAME = 'Dr. Smith'
    const CURP = 'XYZ456'
    const BIRTH_DATE = '1980-05-15'
    const EMAIL = 'dr.smith@example.com'
    const PHONE = 99999998
    const ADDRESS = '789 Medical St'
    const SPECIALITY_ID = 2
    const OFFICE = 'Clinic A'
    const PROFESSIONAL_ID = 123
    const PASSWORD = 'PRO123'
    const BLOCKED = false
    return new MedicEntity(
      ID,
      NAME,
      CURP,
      BIRTH_DATE,
      EMAIL,
      PHONE,
      ADDRESS,
      SPECIALITY_ID,
      OFFICE,
      PROFESSIONAL_ID,
      PASSWORD,
      BLOCKED,
      []
    )
  }

  beforeEach(() => {
    const receptionistStorage = new FakeReceptionistStorage([generateReceptionistDto()])
    const medicStorage = new FakeMedicStorage([generateMedicEntity()])
    const patientStorage = new FakePatientStorage([generatePatientEntity()])
    adminCanRequestAllUsersUC = new AdminCanRequestAllUsersUseCase(
      receptionistStorage,
      medicStorage,
      patientStorage
    )
  })

  it('should be defined', () => {
    expect(adminCanRequestAllUsersUC).toBeDefined()
  })

  it('should return the same data', async () => {
    const getAllUsersResDto = await adminCanRequestAllUsersUC.getAllUsers()
    expect(getAllUsersResDto).toBeDefined()
    expect(getAllUsersResDto.receptionistDtos[0] instanceof ReceptionistDto).toBeTruthy()
    expect(getAllUsersResDto.medicDtos[0] instanceof MedicDto).toBeTruthy()
    expect(getAllUsersResDto.patientDtos[0] instanceof PatientDto).toBeTruthy()
  })
})
