import { Response, Request } from 'express'
import Errors from '../errors/auth'
import { error } from '../helpers/errors'
import { generateToken, compareHash, encryptHash } from '../helpers/auth'
import User from '../model/User'
import Config from '../util/Config'

const login = async (req: Request, res: Response) => {
  const { usuario, password } = req.body
  const user = await User.findOne({ usuario })
  if (!user || !user.active) return error(res, Errors.IncorrectUser)

  const cmp = await compareHash(password, user.password)
  if (!cmp) return error(res, Errors.IncorrectPassword)

  if (await compareHash(Config.PASS_DEF!!, user.password))
    return res.json({ user, reset: true })

  user.token = generateToken(user.id)
  await user.save()

  return res.json({ user })
}

const changePassword = async (req: Request, res: Response) => {
  const { actual, password, password2, usuario } = req.body
  if (password !== password2) return error(res, Errors.MismatchPassword)
  const user = await User.findOne({ usuario })
  if (!user) return error(res, Errors.IncorrectUser)

  if (user.password) {
    const cmp = await compareHash(actual, user.password)
    if (!cmp) return error(res, Errors.MismatchPassword)
  }

  user.password = await encryptHash(password)
  user.token = generateToken(user.id)
  await user.save()

  res.json({ user })
}

export default { login, changePassword }
