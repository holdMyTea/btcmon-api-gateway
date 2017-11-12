import express from 'express'

import controller from '../controller/controllers.js'

const router = express()

router.get('/sources', controller.getSources)

router.get('/:startDate(\\d{13})/:endDate(\\d{13})/all', controller.getFromAll)

router.get('/:startDate(\\d{13})/:endDate(\\d{13})*?', controller.getFromSources)

export default router
