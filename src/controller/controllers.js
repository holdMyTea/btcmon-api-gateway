import axios from 'axios'

import variables from '../config/variables.js'
import config from '../config/config'

const sources = config()

async function getSources (request, response) {
  response.send(await sources())
}

async function getFromSources (request, response) {
  const startDate = request.params.startDate
  const endDate = request.params.endDate
  const requestedSource = request.params[0].slice(1).split('/')

  const data = {}

  for (let source of requestedSource) {
    const out = await axios.get('http://' + variables.DB_SERVICE_HOST + ':' + variables.DB_SERVICE_PORT + '/' + source + '/' + startDate + '/' + endDate)
    data[source] = out.data
  }

  response.send({
    startDate: startDate,
    endDate: endDate,
    sources: requestedSource,
    data: data
  })
}

async function getFromAll (request, response) {
  const startDate = request.params.startDate
  const endDate = request.params.endDate
  const sources = 'Kappa'

  response.send({
    startDate: startDate,
    endDate: endDate,
    sources: sources
  })
}

export default () => {
  return {
    getSources: getSources,
    getFromAll: getFromAll,
    getFromSources: getFromSources
  }
}
