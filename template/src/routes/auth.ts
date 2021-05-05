import { Router } from 'express'
import Base from '../helpers/base'
import Auth from '../api/auth'

export default () => {
  const router = Router()

  router.post('/login', Base.execute(Auth.login))
  router.post('/changePassword', Base.execute(Auth.changePassword))

  return router
}
