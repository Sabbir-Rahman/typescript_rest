import { Express, Router, Request, Response } from 'express'

import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from '../controller/product.controller'
import validate from '../middleware/validateResource'
import { createSessionSchema } from '../schema/sessions.schema'
import { createUserSchema } from '../schema/user.schema'
import deserializeUser from '../middleware/deserializedUser'
import requireUser from '../middleware/requireUser'
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from '../schema/product.schema'

const router = Router()

router.post('/create', [deserializeUser,requireUser, validate(createProductSchema)], createProductHandler)

router.put(
  '/update/:productId',
  [deserializeUser,requireUser, validate(updateProductSchema)],
  updateProductHandler
)

router.get('/view/:productId', validate(getProductSchema), getProductHandler)

router.delete(
  '/delete/:productId',
  [deserializeUser, requireUser, validate(deleteProductSchema)],
  deleteProductHandler
)

export default router
