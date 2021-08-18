import express from 'express'

import * as config from '../handles/config'

const router = express.Router()

router.get('/', config.ok)

export default router
