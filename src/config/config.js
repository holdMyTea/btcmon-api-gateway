import axios from 'axios'

import variables from './variables.js'

/*
TODO: kinda dynimic config should reconsider it
*/

export default () => {
  let sources
  let lastUpdate = 0

  return async () => {
    if (Date.now() - lastUpdate > 12 * 10e4 || !sources) {
      const request = await axios.get('http://' + variables.CONFIG_HOST + ':' + variables.CONFIG_PORT + '/sources')
      sources = request.data
      lastUpdate = Date.now()
    }
    return sources
  }
}
