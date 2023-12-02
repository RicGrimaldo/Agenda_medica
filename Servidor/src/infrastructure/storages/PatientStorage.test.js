const PatientStorage = require('./PatientStorage')

describe('Test PatientStorage', () => {
  const patientStorage = new PatientStorage(undefined)

  it('should be defined', () => {
    expect(patientStorage).toBeDefined()
  })
})
