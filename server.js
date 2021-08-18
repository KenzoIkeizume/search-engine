import Express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import routes from './src/routes'
import config from './config/config'

dotenv.config()
const port = process.env.PORT
const express = Express()

express.use(Express.json())
express.use(cors(config.cors))

express.use('/', routes)

express.listen(port, () => {
  console.log(`Search Engine started in port: ${port}`)
})
