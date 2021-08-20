import express from 'express'

import * as user from '../handles/user'

import { paginationInterceptor } from '../middlewares/pagination'

const router = express.Router()

router.get('/', paginationInterceptor, user.list)

export default router
