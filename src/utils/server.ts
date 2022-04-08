import express from 'express'
import { testRouter, userRouter, productRouter } from '../router'

function createServer() {
  const app = express()
  app.use(express.json())

  app.use('/test', testRouter)
  app.use('/api/users', userRouter)
  app.use('/api/products', productRouter)

  return app 
}

export default createServer