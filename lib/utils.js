import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const generateToken = (user) => {
  const secret = env.SIGNATURE
  const expiresIn = '7d'

  return jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn })
}
