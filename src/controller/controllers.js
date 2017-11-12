import axios from 'axios'

import variables from '../config/variables.js'

// TODO: add collection validator

async function getSources (request, response) {
  let out = 'Kappa'
  response.send(out)
}

async function getFromSources (request, response) {
  const startDate = request.params.startDate
  const endDate = request.params.endDate
  const sources = request.params[0].slice(1).split('/')

  const data = {}

  for (let source of sources) {
    const out = await axios.get('http://' + variables.DB_SERVICE_HOST + ':' + variables.DB_SERVICE_PORT + '/' + source + '/' + startDate + '/' + endDate)
    data[source] = out.data
  }

  response.send({
    startDate: startDate,
    endDate: endDate,
    sources: sources,
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

export default {
  getSources: getSources,
  getFromAll: getFromAll,
  getFromSources: getFromSources
}
