const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const send = (subject, text, html) => {
  const now = new Date().toISOString()
  sgMail
    .send({
      to: process.env.ALERT_EMAIL_TO,
      from: process.env.ALERT_EMAIL_FROM,
      subject: subject,
      text: text || now,
      html: html || now,
    })
    .then(() => {
      console.log(`email ${subject} sent`)
    })
    .catch((error) => {
      console.error(error)
    })
}

module.exports = { send }
