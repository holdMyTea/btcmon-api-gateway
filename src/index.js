import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import variables from './config/variables.js'
import routes from './routes/routes.js'

const app = express()

app.use(bodyParser.json())
app.use(morgan('common'))

// TODO: valid CORS implementation
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/', routes)

app.get('/', (request, response) => response.send('Hold the gate'))

app.listen(variables.APP_PORT, variables.APP_HOST, () => console.log('Gateway listening'))

export default app
