const SpecialityDto = require('../../dtos/SpecialityDto')
const AdminCanGetAllSpecialityUseCase = require('./AdminCanGetAllSpeciality')

class FakeSpecialityStorage {
  #specialities

  constructor () {
    this.#specialities = []
  }

  get specialities () {
    return this.#specialities
  }

  create (specialityDto) {
    this.#specialities.push(specialityDto)
  }

  getAll () {
    return new Promise((resolve) => {
      resolve(this.#specialities)
    })
  }
}

describe('Test admin can get all specialities use case', () => {
  let AdminCanGetAllSpecialityUC = null
  let specialityStorage = null

  beforeEach(() => {
    specialityStorage = generateSpecialityStorage()
    AdminCanGetAllSpecialityUC = new AdminCanGetAllSpecialityUseCase(specialityStorage)
  })

  const generateSpecialityStorage = () => {
    specialityStorage = new FakeSpecialityStorage()
    const specialities = [
      {
        id: 1,
        acronym: 'Dr',
        name: 'Doctor'
      },
      {
        id: 2,
        acronym: 'Dr 2',
        name: 'Doctor 2'
      },
      {
        id: 3,
        acronym: 'Dr 3',
        name: 'Doctor 3'
      }
    ]
    specialities.forEach((speciality) => {
      specialityStorage.create(new SpecialityDto(
        speciality.id,
        speciality.acronym,
        speciality.name
      ))
    })
    return specialityStorage
  }

  it('should be defined', () => {
    expect(AdminCanGetAllSpecialityUC).toBeDefined()
  })

  it('should get all specialities', async () => {
    const isBlocked = true
    const GetAllSpecialityResDto = await AdminCanGetAllSpecialityUC.getAll(isBlocked)
    expect(GetAllSpecialityResDto.status).toBeTruthy()
    expect(GetAllSpecialityResDto.dtos).toBeInstanceOf(Array)
  })
})
