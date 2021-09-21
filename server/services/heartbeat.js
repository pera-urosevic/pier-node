const alerts = require('../alerts')
const email = require('./email')

const onAlertStart = (alert) => {
  email.send(`${alert} - started`)
}

const onAlertEnd = (alert) => {
  email.send(`${alert} - ended`)
}

const start = () => {
  alerts.subscribe({ onAlertStart, onAlertEnd })
}

module.exports = { start }
