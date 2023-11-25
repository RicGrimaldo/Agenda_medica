const QrCodeGenerator = require('qrcode')

module.exports = class QrHelper {
  async getQr (url) {
    return await QrCodeGenerator.toDataURL(url, { errorCorrectionLevel: 'H' })
  }
}
