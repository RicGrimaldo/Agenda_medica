const EncryptionHelper = require('./EncryptionHelper')

describe('Test EncryptionHelper', () => {
  const regularString = '12345678'
  const encryptedString = 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f'
  const encryptionHelper = new EncryptionHelper()

  it('should be defined', () => {
    expect(encryptionHelper).toBeDefined()
  })

  it('should encrypt a string', () => {
    expect(encryptionHelper.encryptString(regularString)).toBe(encryptedString)
  })

  it('should not return the same encrypted string', () => {
    expect(encryptionHelper.encryptString(regularString.substring(1))).not.toBe(encryptedString)
  })
})
