import { Request, Response } from 'express'
import { customAlphabet } from 'nanoid'
import { Types } from 'mongoose';

import { CreateProductInput, UpdateProductInput } from '../schema/product.schema';
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from '../service/product.service';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

export async function createProductHandler(req: Request<{}, {}, CreateProductInput["body"]>, res:Response){
   const userId = res.locals.user._id
   const body = req.body
   const product = await createProduct({
     user: userId,
     ...body,
     productId: 'prod' + nanoid()
   })

   return res.send(product)
}

export async function updateProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
  const productId = req.params.productId 
  const product = await findProduct({ productId })
  const userId = res.locals.user._id
  const update = req.body 
  
  if(!product) {
    return res.sendStatus(404)
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403)
  }

  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true
  })

  return res.send(updatedProduct)

}

export async function getProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
  const productId = req.params.productId 
  
  const product = await findProduct({ productId })

  if(!product) {
    return res.sendStatus(404)
  }

  return res.send(product)
  
}

export async function deleteProductHandler(req: Request<UpdateProductInput["params"]>, res: Response) {
  const userId = res.locals.user._id
  const productId = req.params.productId

  const product = await findProduct({ productId })

  if (!product) {
    return res.sendStatus(404)
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403)
  }

  await deleteProduct({ productId })

  return res.status(200).json("Product deleted")
}