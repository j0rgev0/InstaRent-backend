import express, { json } from 'express'
import { env } from './config/env.js'

// import { authMiddleware } from './middlewares/auth.js'

import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth.js'

import { authRoutes } from './routes/auth.js'
import { userRoutes } from './routes/user.js'
import { propertiesRoutes } from './routes/properties.js'
import { featuresRoutes } from './routes/features.js'
import { imagesRoutes } from './routes/images.js'

import { AuthModel } from './models/postgresql/authModel.js'
// import { AuthModel } from './models/betterAuth/authModel.js'
import { UserModel } from './models/postgresql/userModel.js'
import { PropertiesModel } from './models/postgresql/propertiesModel.js'
import { FeaturesModel } from './models/postgresql/featuresModel.js'
import { ImagesModel } from './models/postgresql/imagesModel.js'

export const createApp = () => {
  const app = express()

  app.all('/api/auth/*', toNodeHandler(auth))
  app.use(json())

  // app.use(authMiddleware)

  app.use('/auth', authRoutes({ model: AuthModel }))

  app.use('/users', userRoutes({ model: UserModel }))
  app.use('/properties', propertiesRoutes({ model: PropertiesModel }))
  app.use('/features', featuresRoutes({ model: FeaturesModel }))
  app.use('/images', imagesRoutes({ model: ImagesModel }))
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
