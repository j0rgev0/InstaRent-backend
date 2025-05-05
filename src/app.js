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

  app.use('/auth', authRoutes({ model: AuthModel }))

  // app.use(authMiddleware)

  app.use(
    '/api',
    ((router) => {
      router.use('/auth', authRoutes({ model: AuthModel }))
      router.use('/users', userRoutes({ model: UserModel }))
      router.use('/properties', propertiesRoutes({ model: PropertiesModel }))
      router.use('/features', featuresRoutes({ model: FeaturesModel }))
      router.use('/images', imagesRoutes({ model: ImagesModel }))
      // router.use('/likes', likesRoutes({ model }))
      // router.use('/chat', chatRoutes({ model }))

      return router
    })(express.Router())
  )

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  const PORT = env.PORT

  app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:3000')
  })
}
