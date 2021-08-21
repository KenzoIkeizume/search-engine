import express from 'express'

import * as config from '../handles/config.js'

const router = express.Router()

router.post('/upload', config.uploudDatabase)

export default router
