import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const generateToken = (usrId, role) => {
  const secret = env.SIGNATURE
  const expiresIn = '7d'

  return jwt.sign({ usrId, role }, secret, { expiresIn })
}
