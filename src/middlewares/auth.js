import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { auth } from '../auth.js'

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const secret = env.SIGNATURE
    const decoded = jwt.verify(token, secret)
    req.user = decoded
    next()
  } catch (e) {
    res.status(403).json({ error: 'Invalid token' })
  }
}

export const betterAuthMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  try {
    const user = await auth.verifyToken(token)
    req.user = user
    next()
  } catch (e) {
    res.status(403).json({ error: 'Invalid token' })
  }
}
