import { Router } from 'express'

import { AuthController } from '../controllers/authController.js'

export const authRoutes = ({ model }) => {
  const authRouter = Router()
  const authController = new AuthController({ model })

  authRouter.post('/register', authController.register)
  authRouter.post('/login', authController.login)

  return authRouter
}
