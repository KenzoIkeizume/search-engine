import express from 'express'

import * as user from '../handles/user'

const router = express.Router()

router.get('/', user.list)

export default router
