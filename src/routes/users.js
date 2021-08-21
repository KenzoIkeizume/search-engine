import express from 'express'

import * as user from '../handles/user.js'

import { paginationInterceptor } from '../middlewares/pagination.js'

const router = express.Router()

router.get('/', paginationInterceptor, user.list)

export default router
