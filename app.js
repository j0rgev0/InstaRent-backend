import express, { json } from 'express'

import { env } from './config/env.js'
import { authMiddleware } from './middlewares/auth.js'

import { authRoutes } from './routes/auth.js'
import { usersRoutes } from './routes/users.js'
import { propertiesRoutes } from './routes/properties.js'

import { AuthModel } from './models/postgresql/authModel.js'
import { UserModel } from './models/postgresql/userModel.js'
import { PropertiesModel } from './models/postgresql/propertiesModel.js'

export const createApp = () => {
  const app = express()
  app.use(json())

  app.use('/auth', authRoutes({ model: AuthModel }))

  app.use(authMiddleware)

  app.use('/users', usersRoutes({ model: UserModel }))
  app.use('/properties', propertiesRoutes({ model: PropertiesModel }))
  // app.use('/likes', likesRoutes({ model }))
  // app.use('/chat', chatRoutes({ model }))

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  const PORT = env.PORT

  app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:3000')
  })
}
