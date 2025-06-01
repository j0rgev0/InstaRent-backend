import express, { json } from 'express'
import { env } from './config/env.js'
import { corsMiddleware } from './middlewares/cors.js'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { toNodeHandler } from 'better-auth/node'
import { auth } from './lib/auth.js'

import { authRoutes } from './routes/auth.js'
import { userRoutes } from './routes/user.js'
import { propertiesRoutes } from './routes/properties.js'
import { featuresRoutes } from './routes/features.js'
import { imagesRoutes } from './routes/images.js'
import { chatRoutes } from './routes/chat.js'

import { AuthModel } from './models/postgresql/authModel.js'
import { UserModel } from './models/postgresql/userModel.js'
import { PropertiesModel } from './models/postgresql/propertiesModel.js'
import { FeaturesModel } from './models/postgresql/featuresModel.js'
import { ImagesModel } from './models/postgresql/imagesModel.js'
import { ChatModel } from './sequelize/chatModel.js'

export const createApp = () => {
  const app = express()
  const httpServer = createServer(app)
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  app.use(corsMiddleware())

  app.all('/api/auth/*', toNodeHandler(auth))
  app.use(json())

  app.use('/auth', authRoutes({ model: AuthModel }))

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)

    socket.on('join_room', (roomId) => {
      socket.join(roomId)
      console.log(`User ${socket.id} joined room: ${roomId}`)
    })

    socket.on('send_message', async (data) => {
      try {
        const message = await ChatModel.create({
          roomId: data.roomId,
          senderId: data.senderId,
          receiverId: data.receiverId,
          message: data.message
        })

        io.to(data.roomId).emit('receive_message', {
          ...message.toJSON(),
          socketId: socket.id
        })
      } catch (error) {
        console.error('Error saving message:', error)
        socket.emit('error', { message: 'Error saving message' })
      }
    })

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
  })

  // app.use(authMiddleware)

  app.use(
    '/api',
    ((router) => {
      router.use('/auth', authRoutes({ model: AuthModel }))
      router.use('/users', userRoutes({ model: UserModel }))
      router.use('/properties', propertiesRoutes({ model: PropertiesModel }))
      router.use('/features', featuresRoutes({ model: FeaturesModel }))
      router.use('/images', imagesRoutes({ model: ImagesModel }))
      router.use('/chat', chatRoutes({ model: ChatModel }))
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
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
  })
}
