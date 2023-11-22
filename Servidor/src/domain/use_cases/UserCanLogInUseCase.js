const LogInResponseDto = require('../dtos/LogInResponseDto')

module.exports = class UserCanLogInUseCase {
  #userStorage
  #encryptionHelper

  constructor (userStorage, encryptionHelper) {
    this.#userStorage = userStorage
    this.#encryptionHelper = encryptionHelper
  }

  get userStorage () {
    return this.#userStorage
  }

  get encryptionHelper () {
    return this.#encryptionHelper
  }

  logIn (email, password) {
    const userDto = this.userStorage.findByEmail(email)
    if (userDto && this.encryptionHelper.encryptString(password) === userDto.password) {
      return new LogInResponseDto(true, userDto.id, userDto.roleId)
    }
    return new LogInResponseDto(false, null, null)
  }
}
