import express, { json } from 'express'
import { env } from './config/env.js'
import { corsMiddleware } from './middlewares/cors.js'

import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth.js'

import { authRoutes } from './routes/auth.js'
import { userRoutes } from './routes/user.js'
import { propertiesRoutes } from './routes/properties.js'
import { featuresRoutes } from './routes/features.js'
import { imagesRoutes } from './routes/images.js'

import { AuthModel } from './models/postgresql/authModel.js'
import { UserModel } from './models/postgresql/userModel.js'
import { PropertiesModel } from './models/postgresql/propertiesModel.js'
import { FeaturesModel } from './models/postgresql/featuresModel.js'
import { ImagesModel } from './models/postgresql/imagesModel.js'

export const createApp = () => {
  const app = express()

  app.use(corsMiddleware())

  app.all('/api/auth/*', toNodeHandler(auth))
  app.use(json())

  app.use('/auth', authRoutes({ model: AuthModel }))

  // app.use(authMiddleware)

  // Enrutamiento API
  app.use(
    '/api',
    ((router) => {
      router.use('/auth', authRoutes({ model: AuthModel }))
      router.use('/users', userRoutes({ model: UserModel }))
      router.use('/properties', propertiesRoutes({ model: PropertiesModel }))
      router.use('/features', featuresRoutes({ model: FeaturesModel }))
      router.use('/images', imagesRoutes({ model: ImagesModel }))
      return router
    })(express.Router())
  )

  app.get('/', (req, res) => {
    res.send('Welcome to Instarent API!')
  })

  app.use((req, res) => {
    res.status(404).send(`404, ${req.originalUrl} not foud`)
  })

  app.options('*', corsMiddleware())

  const PORT = env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
  })
}
