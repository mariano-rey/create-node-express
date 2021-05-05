import { Request, Response, NextFunction } from 'express'
import { error } from './errors'
import Auth from '../errors/auth'
import jwt from 'jsonwebtoken'
import Config from '../util/Config'
import Errores from '../errors/auth'
import { UserProps } from '../model/User'
import bcrypt from 'bcrypt'
import ApiError from './apiError'

interface AutenticarProps {
  admin?: boolean
}

export const encryptHash = async (password: string) =>
  await bcrypt.hash(password, Config.SALTROUND)

export const compareHash = async (valor: string, aComparar: string) =>
  await bcrypt.compare(valor, aComparar)

export const generateToken = (id: string) =>
  jwt.sign({ id }, Config.SECRETA!!, { expiresIn: 60 * 60 * 24 * 15 })

export const validateToken = (token: string) => {
  try {
    return jwt.verify(token, Config.SECRETA!!) as any
  } catch (ex) {
    return null
  }
}

export const authenticateUsuario = ({ admin }: AutenticarProps) => async (
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
    if (!token) throw new ApiError(Errores.NoToken)
    const { id } = validateToken(token) || {}
    if (!id) throw new ApiError(Errores.ExpiratedToken)

    const user = (await Usuario.FindById(id)) as UserProps
    if (admin && !user.admin) throw new ApiError(Errores.WithoutPermisions)
    req.user = user
    return next()
  } catch (ex) {
    console.log(ex)
    return error(res, Auth.ExpiratedToken)
  }
}
