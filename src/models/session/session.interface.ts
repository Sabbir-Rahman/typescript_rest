import { CorrectedDocument } from "../types";
import { Types } from 'mongoose';

export interface Session {
  user: Types.ObjectId,
  valid: Boolean,
  userAgent: String
}

export type SessionDoc = Session & CorrectedDocument