const { exec } = require('child_process')
const state = require('../state')
const alerts = require('../alerts')

const execDiskFree = async () => {
  return new Promise((resolve) => {
    exec('df /', (error, stdout, stderr) => {
      resolve(stdout)
    })
  })
}

const getDiskUsage = (result) => {
  const matched = result.match(
    /Filesystem.*\n[^ ]* *(?<size>[^ ]*) *(?<used>[^ ]*) *(?<available>[^ ]*) *(?<usage>[^%]*)% \//
  )
  const disk = matched.groups
  return Number(disk.usage)
}

const diskFree = async () => {
  const result = await execDiskFree()
  const diskUsage = getDiskUsage(result)

  state.disk.usage = diskUsage

  if (diskUsage > 90) {
    alerts.add('Disk Usage')
  } else {
    alerts.remove('Disk Usage')
  }
}

module.exports = diskFree
