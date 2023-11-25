const QrHelper = require('./QrHelper')

describe('Test QrHelper', () => {
  const qrHelper = new QrHelper()

  it('should be defined', () => {
    expect(qrHelper).toBeDefined()
  })
})
