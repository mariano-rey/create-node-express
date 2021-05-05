import Errors from './errors'
import { NextFunction, Request, Response } from 'express'
import ApiError from './apiError'

export type FxProps = (req: Request, res: Response, next: NextFunction) => any
const execute = (fx: FxProps) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const error = Errors.check(req, res)
    if (error) return error

    await fx(req, res, next)
  } catch (error) {
    if (error instanceof ApiError) {
      res.status(400).json({ message: error.message, code: error.code })
      next(error)
    } else {
      res.status(500).json({ message: error.message, code: error.message })
      next(error)
    }
  }
}

export default { execute }
