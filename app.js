import express, { json } from 'express'
import { authRoutes } from './routes/auth.js'
import { usersRoutes } from './routes/users.js'
import { env } from './config/env.js'
import { authMiddleware } from './middlewares/auth.js'
export const createApp = ({ model }) => {
  const app = express()
  app.use(json())

  // app.use(authMiddleware)

  app.use('/auth', authRoutes({ model }))
  app.use('/users', authMiddleware, usersRoutes({ model }))
  // app.use('/likes', likesRoutes({ model }))
  // app.use('/properties', propertiesRoutes({ model }))
  // app.use('/chat', chatRoutes({ model }))

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  const PORT = env.PORT

  app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:3000')
  })
}
