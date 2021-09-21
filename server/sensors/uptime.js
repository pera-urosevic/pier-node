const os = require('os')
const state = require('../state')

const uptime = async () => {
  const seconds = os.uptime()
  const days = Math.floor(seconds / (3600 * 24))
  const hours = Math.floor((seconds % (3600 * 24)) / 3600)
  state.uptime = {
    days,
    hours,
  }
}

module.exports = uptime
