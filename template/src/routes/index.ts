import express, { Router } from 'express'
import Auth from './auth'

export default () => {
  const router = Router()

  router.use('/auth', Auth())
  router.use('/docs', express.static('docs'))

  return router
}
