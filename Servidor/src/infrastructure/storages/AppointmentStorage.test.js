const AppointmentStorage = require('./AppointmentStorage')

describe('Test AppointmentStorage', () => {
  const appointmentStorage = new AppointmentStorage(undefined)

  it('should be defined', () => {
    expect(appointmentStorage).toBeDefined()
  })
})
