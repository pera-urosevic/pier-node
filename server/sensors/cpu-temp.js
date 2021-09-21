const { readFile } = require('fs').promises
const state = require('../state')
const alerts = require('../alerts')

const cpuTemp = async () => {
  const result = await readFile('/sys/class/thermal/thermal_zone0/temp')
  const temp = result / 1000

  state.cpu.temp = temp

  if (temp > 80) {
    alerts.add('CPU Temperature')
  } else {
    alerts.remove('CPU Temperature')
  }
}

module.exports = cpuTemp
