const UserStorage = require('./UserStorage')

describe('Test UserStorage', () => {
  const userStorage = new UserStorage(undefined)

  it('should be defined', () => {
    expect(userStorage).toBeDefined()
  })
})
