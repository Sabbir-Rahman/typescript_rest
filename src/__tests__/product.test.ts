import supertest from 'supertest'
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose  from "mongoose"
import createServer from '../utils/server'

const app = createServer()

describe('product', ()=> {

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()

    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('get product', ()=> {
    describe('given the product does not exist', () => {
      it('should return a 404',async () => {
        // expect(true).toBe(true)
        const productId = 'product-123'
        await supertest(app).get(`/api/products/view/${productId}`)
      })
    })
  })
})