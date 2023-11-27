const NewAppointmentMail = require('./NewAppointmentMail')

describe('Test NewAppointmentMail', () => {
  const newAppointmentMail = new NewAppointmentMail()

  it('should be defined', () => {
    expect(newAppointmentMail).toBeDefined()
  })
})
