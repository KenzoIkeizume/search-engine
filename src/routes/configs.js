import express from 'express'

import * as config from '../handles/config'

const router = express.Router()

router.post('/upload', config.uploudDatabase)

export default router
