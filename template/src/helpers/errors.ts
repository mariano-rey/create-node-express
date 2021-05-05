import { validationResult } from 'express-validator'
import { Response, Request } from 'express'

export interface ErrorMessage {
  message: string
  code: number
}

export const error = (res: Response, error: ErrorMessage, statusCode = 400) => {
  return res.status(statusCode).json({ error })
}

const check = (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return null
  }

  const arr: ErrorMessage[] = errors.array().map((e) => ({ ...e.msg }))
  if (arr.length === 1) {
    const [first] = arr
    return error(res, first)
  }
  return res.status(400).json({ errors: arr.sort((a, b) => a.code - b.code) })
}

export default { check }
