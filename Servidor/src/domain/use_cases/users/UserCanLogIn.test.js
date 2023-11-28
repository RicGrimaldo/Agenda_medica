const Roles = require('../../constants/Roles')
const UserDto = require('../../dtos/UserDto')
const UserCanLogInUseCase = require('./UserCanLogIn')

class FakeUserStorage {
  #userDtos

  constructor () {
    this.#userDtos = []
  }

  get userDtos () {
    return this.#userDtos
  }

  addUserEntity (userEntity) {
    this.userDtos.push(userEntity)
  }

  findByEmail (email) {
    return new Promise((resolve) => {
      resolve(this.userDtos.find(userEntity => userEntity.email === email))
    })
  }
}

describe('Test user can log in use case', () => {
  const ID = 10
  const EMAIL = 'email@mail.com'
  const PASSWORD = 'password'
  const ROLE_ID = Roles.PATIENT
  const USER_ENTITY = new UserDto(ID, EMAIL, PASSWORD, ROLE_ID)
  let userCanLogInUC = null
  let userStorage = null

  beforeEach(() => {
    userStorage = generateUserStorage()
    userCanLogInUC = new UserCanLogInUseCase(userStorage)
  })

  const generateUserStorage = () => {
    userStorage = new FakeUserStorage()
    const userDtos = [
      { id: 1, email: 'test@test.com', password: '12345678', roleId: Roles.ADMINISTRATOR },
      { id: 5, email: 'jdoe@test.com', password: 'password', roleId: Roles.MEDIC },
      { id: 7, email: 'email@test.com', password: 'pass123', roleId: Roles.RECEPTIONIST }
    ]
    userDtos.forEach((user) => {
      userStorage.addUserEntity(new UserDto(user.id, user.email, user.password, user.roleId))
    })
    return userStorage
  }

  it('should be defined', () => {
    expect(userCanLogInUC).toBeDefined()
  })

  it('should validate an existing user', async () => {
    userStorage.addUserEntity(USER_ENTITY)
    const logInResDto = await userCanLogInUC.logIn(EMAIL, PASSWORD)
    expect(logInResDto.status).toBeTruthy()
    expect(logInResDto.userId).toBeDefined()
    expect(logInResDto.roleId).toBeDefined()
  })

  it('should return the correct user', async () => {
    userStorage.addUserEntity(USER_ENTITY)
    const logInResDto = await userCanLogInUC.logIn(EMAIL, PASSWORD)
    expect(logInResDto.status).toBeTruthy()
    expect(logInResDto.userId).toBe(ID)
    expect(logInResDto.roleId).toBe(ROLE_ID)
  })

  it('should reject a non existing user', async () => {
    const logInResDto = await userCanLogInUC.logIn(EMAIL, PASSWORD)
    expect(logInResDto.status).toBeFalsy()
    expect(logInResDto.userId).toBeNull()
    expect(logInResDto.roleId).toBeNull()
  })
})
