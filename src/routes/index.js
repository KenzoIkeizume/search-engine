import express from 'express'

import config from './config.js'

const router = express.Router()

router.use('/api/config', config)

export default router
