require('dotenv').config()
const mailSystem = require('nodemailer')
const HTMLtoPDF = require('html-pdf-node')

module.exports = class MailerHelper {
  #mailTransporter

  constructor () {
    this.#mailTransporter = mailSystem.createTransport({
      host: process.env.MAIL_HOST,
      secureConnection: process.env.MAIL_SECURE_CONNECTION === 'true',
      port: parseInt(process.env.MAIL_PORT),
      tls: {
        ciphers: 'SSLv3'
      },
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    })
  }

  get mailTransporter () {
    return this.#mailTransporter
  }

  async sendHtmlMail (subject, to, htmlTemplate, filename) {
    const mailerWorking = await this.mailTransporter.verify()

    if (mailerWorking) {
      const file = { content: htmlTemplate }
      const options = { format: 'A4' }
      const pdf = await HTMLtoPDF.generatePdf(file, options)

      const message = {
        from: process.env.MAIL_USER,
        to,
        subject,
        html: htmlTemplate,
        attachments: [
          {
            filename,
            content: pdf
          }
        ]
      }

      this.mailTransporter.sendMail(message, (err, info) => {
        console.info('info: ' + info.response)
        console.info('err: ' + err)
      })
    }
  }
}
