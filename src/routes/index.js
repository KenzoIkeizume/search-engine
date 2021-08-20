import express from 'express'

import configs from './configs.js'
import users from './users.js'

const router = express.Router()

router.use('/api/configs', configs)
router.use('/api/users', users)

export default router
