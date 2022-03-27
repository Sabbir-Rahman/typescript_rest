import { Schema, model, Model } from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10)

import { ProductDoc, Product } from './product.interface';

const productSchema = new Schema<ProductDoc>(
  {
    productId: { type: String, unique: true, default: `prod_${nanoid}` },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: String }
  },
  {
    timestamps: true
  }
)

const ProductModel = model<ProductDoc>('product', productSchema) 

export default ProductModel