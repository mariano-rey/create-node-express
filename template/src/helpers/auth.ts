import { Request, Response, NextFunction } from 'express'
import { error } from './errors'
import Auth from '../errors/auth'
import jwt from 'jsonwebtoken'
import Config from '../util/Config'
import Errors from '../errors/auth'
import User, { UserProps } from '../model/User'
import bcrypt from 'bcrypt'
import ApiError from './apiError'

interface AuthenticateProps {
  admin?: boolean
}

export const encryptHash = async (password: string) =>
  await bcrypt.hash(password, Config.SALTROUND)

export const compareHash = async (value: string, toCompare: string) =>
  await bcrypt.compare(value, toCompare)

export const generateToken = (id: string) =>
  jwt.sign({ id }, Config.SECRET!!, { expiresIn: '15d' }) // 15 days

export const validateToken = (token: string) => {
  try {
    return jwt.verify(token, Config.SECRET!!) as any
  } catch (ex) {
    return null
  }
}

export const authenticateUser = ({ admin }: AuthenticateProps) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers
  if (!authorization) {
    return error(res, Auth.NoToken)
  }

  try {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) throw new ApiError(Errors.NoToken)
    const { id } = validateToken(token) || {}
    if (!id) throw new ApiError(Errors.ExpiratedToken)

    const user = (await User.findById(id)) as UserProps
    if (admin && !user.admin) throw new ApiError(Errors.WithoutPermisions)
    req.user = user
    return next()
  } catch (ex) {
    console.log(ex)
    return error(res, Auth.ExpiratedToken)
  }
}
