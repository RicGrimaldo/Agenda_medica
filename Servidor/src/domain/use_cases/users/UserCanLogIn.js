const LogInResDto = require('../../dtos/LogInResDto')

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

  async logIn (email, password) {
    const userDto = await this.userStorage.findByEmail(email)
    if (userDto && this.encryptionHelper.encryptString(password) === userDto.password) {
      return new LogInResDto(true, userDto.id, userDto.roleId)
    }
    return new LogInResDto(false, null, null)
  }
}
