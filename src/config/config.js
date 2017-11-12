import axios from 'axios'

import variables from './variables.js'

export default async () => {
  const request = await axios.get('http://' + variables.CONFIG_HOST + ':' + variables.CONFIG_PORT + '/sources')
  return request.data
}
