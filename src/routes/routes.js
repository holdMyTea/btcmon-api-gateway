import express from 'express'

import controller from '../controller/controllers.js'

const router = express()
const callbacks = controller()

router.get('/sources', callbacks.getSources)

router.get('/:startDate(\\d{13})/:endDate(\\d{13})/all', callbacks.getFromAll)

router.get('/:startDate(\\d{13})/:endDate(\\d{13})*?', callbacks.getFromSources)

export default router
