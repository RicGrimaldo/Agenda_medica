const MedicStorage = require('./MedicStorage')

describe('Test MedicStorage', () => {
  const medicStorage = new MedicStorage(undefined)

  it('should be defined', () => {
    expect(medicStorage).toBeDefined()
  })
})
