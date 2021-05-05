import { Document, Schema } from 'mongoose'
import { addOns, configuration } from './index'

export interface UserProps {
  name: string
  surname: string
  user: string
  password: string
  active: boolean
  admin: boolean
  token?: string
}

const schema = new Schema(
  {
    name: { type: String, index: true, unique: true, required: true },
    surname: { type: String, required: true },
    user: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true },
    admin: { type: Boolean, required: true },
    token: { type: String },
  },
  configuration,
)

export type UserModel = Document & UserProps
export default addOns<UserModel>('users', schema)
