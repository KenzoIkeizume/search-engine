import express from 'express'

import configs from './configs.js'
import users from './users.js'

import { generateToken, authenticateToken } from '../middlewares/auth.js'

const router = express.Router()

router.use('/api/login', generateToken)

router.use('/api/configs', authenticateToken, configs)
router.use('/api/users', authenticateToken, users)

export default router
