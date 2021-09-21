const { exec } = require('child_process')
const state = require('../state')
const alerts = require('../alerts')

const execPing = async () => {
  return new Promise((resolve) => {
    exec('ping -c 3 -q www.google.com', (error, stdout, stderr) => {
      if (error) {
        alerts.add('Internet Error')
        resolve({ error, stderr })
      } else {
        alerts.remove('Internet Error')
        resolve({ stdout })
      }
    })
  })
}

const getPing = (result) => {
  let ping
  if (result.stdout) {
    const matched = result.stdout.match(
      /statistics ---\n.*received, (?<loss>[^%]*)%.*\n.* = (?<min>[^/]*)\/(?<avg>[^/]*)\/(?<max>[^/]*)\/(?<mdev>[^/]*) .*/
    )
    ping = {
      loss: Number(matched.groups.loss),
      min: Number(matched.groups.min),
      avg: Number(matched.groups.avg),
      max: Number(matched.groups.max),
      mdev: Number(matched.groups.mdev),
    }
  } else {
    ping = result
  }
  ping.ts = Date.now()
  return ping
}

const ping = async () => {
  const result = await execPing()
  const ping = getPing(result)

  state.net.push(ping)
  state.net = state.net.slice(-1 * 6 * 24)

  if (ping.avg > 1000.0) {
    alerts.add('Internet Slow')
  } else {
    alerts.remove('Internet Slow')
  }
}

module.exports = ping
