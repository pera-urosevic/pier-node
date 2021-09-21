const alerts = require('../alerts')
const email = require('./email')

const onAlertStart = (alert) => {
  email.send(alert)
}

const onAlertEnd = (alert) => {
  email.send(alert)
}

const start = () => {
  alerts.subscribe({ onAlertStart, onAlertEnd })
}

module.exports = { start }
