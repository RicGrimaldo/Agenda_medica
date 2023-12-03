const ReceptionistStorage = require('./ReceptionistStorage')

describe('Test ReceptionistStorage', () => {
  const receptionistStorage = new ReceptionistStorage(undefined)

  it('should be defined', () => {
    expect(receptionistStorage).toBeDefined()
  })
})
