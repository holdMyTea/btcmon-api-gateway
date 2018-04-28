import axios from 'axios'

import variables from '../config/variables.js'
import config from '../config/config'

const sources = config()

async function getSources (request, response) {
  const availableSources = await sources()

  response.send({
    sources: availableSources
  })
}

async function getFromSources (request, response) {
  const availableSources = await sources()

  const startDate = request.params.startDate
  const endDate = request.params.endDate
  const requestedSources = request.params[0].slice(1).split('/')

  for (let source of requestedSources) {
    if (!availableSources.includes(source)) {
      response.status(400).send('Source(s) unavailable')
      return
    }
  }

  response.send(await requestData(startDate, endDate, requestedSources))
}

async function getFromSourcesSampled (request, response) {
  const availableSources = await sources()

  const startDate = request.params.startDate
  const endDate = request.params.endDate
  const samples = request.params.samples
  const requestedSources = request.params[0].slice(1).split('/')

  for (let source of requestedSources) {
    if (!availableSources.includes(source)) {
      response.status(400).send('Source(s) unavailable')
      return
    }
  }

  const receivedData = await requestData(startDate, endDate, requestedSources)
  receivedData.data.forEach(
    source => {
      const filterValue = (source.data.length / samples).toFixed(0)
      source.data = source.data.filter(
        (value, index) => index % filterValue === 0
      )
    }
  )

  response.send({
    startDate,
    endDate,
    samples,
    sources: requestedSources,
    data: receivedData.data
  })
}

async function getFromAll (request, response) {
  const startDate = request.params.startDate
  const endDate = request.params.endDate
  const from = await sources()

  response.send(await requestData(startDate, endDate, from))
}

async function requestData (startDate, endDate, requestedSources) {
  const data = []
  const requests = []

  for (let source of requestedSources) {
    requests.push(
      axios.get('http://' + variables.DB_SERVICE_HOST + ':' + variables.DB_SERVICE_PORT +
        '/' + source + '/' + startDate + '/' + endDate).then(
        response => {
          data.push({
            name: source,
            data: response.data
          })
        }
      )
    )
  }

  await Promise.all(requests)

  return {
    startDate,
    endDate,
    sources: requestedSources,
    data
  }
}

export default () => {
  return {
    getSources,
    getFromAll,
    getFromSources,
    getFromSourcesSampled
  }
}
