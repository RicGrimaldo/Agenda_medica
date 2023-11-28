const PatientDto = require('../../dtos/entities/PatientDto')
const AdminCanDeletePatientUseCase = require('./AdminCanDeletePatient')

class FakeMedicStorage {
  #patients

  constructor () {
    this.#patients = []
  }

  create (patientDto) {
    this.#patients.push(patientDto)
  }

  delete (id) {
    const patientToDelete = this.#patients.find(patientDto => patientDto.id === id)
    if (patientToDelete) {
      this.#patients = this.#patients.filter(patientDto => patientDto.id !== id)
      return true
    }
    return false
  }
}

describe('Test admin can delete patient use case', () => {
  let AdminCanDeletePatientUC = null
  let patientStorage = null

  beforeEach(() => {
    patientStorage = generatePatientStorage()
    AdminCanDeletePatientUC = new AdminCanDeletePatientUseCase(patientStorage)
  })

  const generatePatientStorage = () => {
    patientStorage = new FakeMedicStorage()
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
    expect(AdminCanDeletePatientUC).toBeDefined()
  })

  it('should delete a patient', async () => {
    const id = 1
    const DeletePatientResDto = await AdminCanDeletePatientUC.delete(id)
    expect(DeletePatientResDto.status).toBeTruthy()
  })

  it('should fail when delete a patient', async () => {
    const id = 10
    const DeletePatientResDto = await AdminCanDeletePatientUC.delete(id)
    expect(DeletePatientResDto.status).toBeFalsy()
  })
})
