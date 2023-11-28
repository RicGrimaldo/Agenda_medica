const LogInResDto = require('../../dtos/responses/LogInResDto')

module.exports = class UserCanLogInUseCase {
  #userStorage

  constructor (userStorage) {
    this.#userStorage = userStorage
  }

  get userStorage () {
    return this.#userStorage
  }

  async logIn (email, password) {
    const userDto = await this.userStorage.findByEmail(email)
    if (userDto && password === userDto.password) {
      return new LogInResDto(true, userDto.id, userDto.roleId)
    }
    return new LogInResDto(false, null, null)
  }
}
