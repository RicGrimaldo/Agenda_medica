const Roles = require('../constants/Roles')
const UserDto = require('../dtos/UserDto')
const EncryptionHelper = require('../helpers/EncryptionHelper')
const UserCanLogInUseCase = require('./UserCanLogInUseCase')

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
    return this.userDtos.find(userEntity => userEntity.email === email)
  }
}

describe('Test user can log in use case', () => {
  const encryptionHelper = new EncryptionHelper()
  const ID = 10
  const EMAIL = 'email@mail.com'
  const PASSWORD = 'password'
  const ROLE_ID = Roles.PATIENT
  const USER_ENTITY = new UserDto(ID, EMAIL, encryptionHelper.encryptString(PASSWORD), ROLE_ID)
  let userCanLogInUseCase = null
  let userStorage = null

  beforeEach(() => {
    userStorage = generateUserStorage()
    userCanLogInUseCase = new UserCanLogInUseCase(userStorage, encryptionHelper)
  })

  const generateUserStorage = () => {
    userStorage = new FakeUserStorage()
    const userDtos = [
      { id: 1, email: 'test@test.com', password: '12345678', roleId: Roles.ADMINISTRATOR },
      { id: 5, email: 'jdoe@test.com', password: 'password', roleId: Roles.MEDIC },
      { id: 7, email: 'email@test.com', password: 'pass123', roleId: Roles.RECEPTIONIST }
    ]
    userDtos.forEach((user) => {
      userStorage.addUserEntity(new UserDto(user.id, user.email, encryptionHelper.encryptString(user.password), user.roleId))
    })
    return userStorage
  }

  it('should be defined', () => {
    expect(userCanLogInUseCase).toBeDefined()
  })

  it('should validate an existing user', () => {
    userStorage.addUserEntity(USER_ENTITY)
    const logInResponseDto = userCanLogInUseCase.logIn(EMAIL, PASSWORD)
    expect(logInResponseDto.status).toBeTruthy()
    expect(logInResponseDto.userId).toBeDefined()
    expect(logInResponseDto.roleId).toBeDefined()
  })

  it('should return the correct user', () => {
    userStorage.addUserEntity(USER_ENTITY)
    const logInResponseDto = userCanLogInUseCase.logIn(EMAIL, PASSWORD)
    expect(logInResponseDto.status).toBeTruthy()
    expect(logInResponseDto.userId).toBe(ID)
    expect(logInResponseDto.roleId).toBe(ROLE_ID)
  })

  it('should reject a non existing user', () => {
    const logInResponseDto = userCanLogInUseCase.logIn(EMAIL, PASSWORD)
    expect(logInResponseDto.status).toBeFalsy()
    expect(logInResponseDto.userId).toBeNull()
    expect(logInResponseDto.roleId).toBeNull()
  })
})
