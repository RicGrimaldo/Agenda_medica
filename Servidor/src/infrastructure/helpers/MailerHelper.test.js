const MailerHelper = require('./MailerHelper')

describe('Test MailerHelper', () => {
  const mailerHelper = new MailerHelper()

  it('should be defined', () => {
    expect(mailerHelper).toBeDefined()
  })
})
