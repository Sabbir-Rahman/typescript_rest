import { Schema, model, Model } from 'mongoose';
import { Session, SessionDoc } from './session.interface';

const sessionSchema = new Schema<SessionDoc>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    valid: { type: Boolean, required: true},
    userAgent: { type: String}
  },
  {
    timestamps: true,
  }
)

const SessionModel = model<SessionDoc>('session', sessionSchema) 

export default SessionModel