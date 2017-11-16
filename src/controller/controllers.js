import axios from 'axios'

import variables from '../config/variables.js'
import config from '../config/config'

const sources = config()

async function getSources (request, response) {
  response.send(await sources())
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

async function getFromAll (request, response) {
  const startDate = request.params.startDate
  const endDate = request.params.endDate
  const from = await sources()

  response.send(await requestData(startDate, endDate, from))
}

async function requestData (startDate, endDate, requestedSources) {
  const data = {}

  for (let source of requestedSources) {
    const out = await axios.get('http://' + variables.DB_SERVICE_HOST + ':' + variables.DB_SERVICE_PORT + '/' + source + '/' + startDate + '/' + endDate)
    data[source] = out.data
  }

  return {
    startDate: startDate,
    endDate: endDate,
    sources: requestedSources,
    data: data
  }
}

export default () => {
  return {
    getSources: getSources,
    getFromAll: getFromAll,
    getFromSources: getFromSources
  }
}
