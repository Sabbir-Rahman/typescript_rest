import { CorrectedDocument } from "../types";
import { Types } from 'mongoose';

export interface Product {
  user: Types.ObjectId,
  title: string,
  description: string,
  price: number,
  image: string,
}

export type ProductDoc = Product & CorrectedDocument