import { CorrectedDocument } from "../types";

export interface User {
  email: string,
  name: string,
  password: string
}

export type UserDoc = User & CorrectedDocument