const crypto = require('crypto')

module.exports = class EncryptionHelper {
  encryptString (string) {
    return crypto.createHash('sha256').update(string).digest('hex')
  }
}
