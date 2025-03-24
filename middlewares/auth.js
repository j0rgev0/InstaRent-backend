import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const secret = env.SIGNATURE
    const decoded = jwt.verify(token.split(' ')[1], secret)
    req.user = decoded
    next()
  } catch (e) {
    res.status(403).json({ error: 'Token inválido o expirado' })
  }
}
