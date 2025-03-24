import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const generateToken = (userId, role) => {
  const secret = env.SIGNATURE
  const expiresIn = '7d'

  return jwt.sign({ userId, role }, secret, { expiresIn })
}
