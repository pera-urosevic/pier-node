const top = require('./top')
const ping = require('./ping')
const uptime = require('./uptime')
const cpuTemp = require('./cpu-temp')
const diskFree = require('./disk-free')

const startSensor = (sensor, interval) => {
  sensor()
  setInterval(sensor, interval)
}

const start = () => {
  startSensor(top, 10 * 1000)
  startSensor(ping, 10 * 60 * 1000)
  startSensor(uptime, 60 * 60 * 1000)
  startSensor(cpuTemp, 5 * 1000)
  startSensor(diskFree, 60 * 1000)
}

module.exports = { start }
