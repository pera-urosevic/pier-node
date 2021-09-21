const express = require('express')
const cors = require('cors')
const state = require('./state')
const sensors = require('./sensors')
const services = require('./services')

const port = 8000
const app = express()

app.use(cors())

app.get('/state', async (req, res) => {
  try {
    res.json(state)
  } catch (error) {
    console.error(error)
    res.status(400).json(error)
  }
})

sensors.start()
services.start()

app.listen(port, () => {
  console.log(`pier listening at http://localhost:${port}`)
})
