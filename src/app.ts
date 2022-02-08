import express from 'express'

import config from 'config'
import connect from './utils/connect'
import logger from './logger/logger'
import { testRouter } from './router'

const app = express()
const port = config.get<number>('port')

app.use('/test', testRouter)

app.listen(port,async ()=> {
  logger.info(`App is running on ${port}`)

  await connect()
})

