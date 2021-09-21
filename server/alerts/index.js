const alerts = new Set()
const subscribers = new Set()

const add = (alert) => {
  if (alerts.has(alert)) return
  alerts.add(alert)
  for (const subscriber of subscribers) {
    if (subscriber.onAlertStart) subscriber.onAlertStart(alert)
  }
}

const remove = (alert) => {
  if (!alerts.has(alert)) return
  alerts.delete(alert)
  for (const subscriber of subscribers) {
    if (subscriber.onAlertEnd) subscriber.onAlertEnd(alert)
  }
}

const subscribe = (subscriber) => {
  subscribers.add(subscriber)
}

const unsubscribe = (subscriber) => {
  subscribers.delete(subscriber)
}

module.exports = {
  add,
  remove,
  subscribe,
  unsubscribe,
}
