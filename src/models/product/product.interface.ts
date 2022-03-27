import { CorrectedDocument } from "../types";
import { Types } from 'mongoose';

export interface Product {
  productId: string,
  user: Types.ObjectId,
  title: string,
  description: string,
  price: number,
  image: string,
}

export type ProductDoc = Product & CorrectedDocument