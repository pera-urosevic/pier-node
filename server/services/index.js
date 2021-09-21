const heartbeat = require('./heartbeat')

const start = () => {
  heartbeat.start()
}

module.exports = { start }
