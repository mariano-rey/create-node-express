import { body, check, ValidationChain } from 'express-validator'

export enum Types {
  usuario = 100,
  auth = 300,
}

export interface Error {
  message: string
  code: number
}
export type Errores = Error | ValidationChain
