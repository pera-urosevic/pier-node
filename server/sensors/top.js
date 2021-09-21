const { exec } = require('child_process')
const state = require('../state')
const alerts = require('../alerts')

const execTop = async () => {
  return new Promise((resolve) => {
    exec('top -b -n 1 -o -PID -w 200', (error, stdout, stderr) => {
      resolve(stdout)
    })
  })
}

const getUsageCpu = (result) => {
  const matched = result.match(
    /%Cpu\(s\): *(?<user>[^ ]*) us, *(?<system>[^ ]*) sy, *(?<nice>[^ ]*) ni, *(?<idle>[^ ]*) id, *(?<wait>[^ ]*) wa, *(?<hi>[^ ]*) hi, *(?<si>[^ ]*) si, *(?<st>[^ ]*) st/
  )
  const cpu = matched.groups
  const usage = 100.0 - Number(cpu.idle)
  return usage
}

const getUsageMem = (result) => {
  const matched = result.match(
    /Mem : *(?<total>[^ ]*) total, *(?<free>[^ ]*) free, *(?<used>[^ ]*) used, *(?<cache>[^ ]*) buff\/cache/
  )
  const mem = matched.groups
  const usage = (mem.used / mem.total) * 100
  return usage
}

const getUsageSwap = (result) => {
  const matched = result.match(
    /Swap: *(?<total>[^ ]*) total, *(?<free>[^ ]*) free, *(?<used>[^ ]*) used. *(?<avail>[^ ]*) avail Mem/
  )
  const swap = matched.groups
  const usage = (swap.used / swap.total) * 100
  return usage
}

const getProcs = (result) => {
  const lines = result.split('\n').slice(7)
  const procs = lines
    .map((line) => {
      const matched = line.match(
        / *(?<pid>[0-9]*) *(?<user>[^ ]*) *(?<pr>[^ ]*) *(?<ni>[^ ]*) *(?<virt>[^ ]*) *(?<res>[^ ]*) *(?<shr>[^ ]*) *(?<s>[^ ]*) *(?<cpu>[^ ]*) *(?<mem>[^ ]*) *(?<time>[^ ]*) *(?<cmd>.*)/
      )
      return {
        pid: Number(matched.groups.pid),
        user: matched.groups.user,
        pr: Number(matched.groups.pr),
        ni: Number(matched.groups.ni),
        virt: Number(matched.groups.virt),
        res: Number(matched.groups.res),
        shr: Number(matched.groups.shr),
        s: matched.groups.s,
        cpu: Number(matched.groups.cpu),
        mem: Number(matched.groups.mem),
        time: matched.groups.time,
        cmd: matched.groups.cmd,
      }
    })
    .filter((proc) => proc.cmd != 'top')
  return procs
}

const getTopProcs = (metric, size, procs) => {
  const top = [...procs]
  top.sort((a, b) => b[metric] - a[metric])
  return top.slice(0, size)
}

const top = async () => {
  const result = await execTop()
  const cpuUsage = getUsageCpu(result)
  const memUsage = getUsageMem(result)
  const swapUsage = getUsageSwap(result)
  const procs = getProcs(result)
  const cpuTop = getTopProcs('cpu', 5, procs)
  const memTop = getTopProcs('mem', 5, procs)

  state.cpu.usage = cpuUsage
  state.mem.usage = memUsage
  state.mem.swap = swapUsage
  state.cpu.top = cpuTop
  state.mem.top = memTop

  if (cpuUsage > 80) {
    alerts.add('CPU Usage')
  } else {
    alerts.remove('CPU Usage')
  }

  if (memUsage > 80) {
    alerts.add('MEM Usage')
  } else {
    alerts.remove('MEM Usage')
  }
}

module.exports = top
