const SpecialityStorage = require('./SpecialityStorage')

describe('Test SpecialityStorage', () => {
  const specialityStorage = new SpecialityStorage(undefined)

  it('should be defined', () => {
    expect(specialityStorage).toBeDefined()
  })
})
