import express, { json } from 'express'
import { userRoutes } from './routes/users.js'

export const createApp = ({ model }) => {
  const app = express()
  app.use(json())

  app.use('/users', userRoutes({ model }))
  // app.use('/likes', likesRoutes({ model }))
  // app.use('/properties', propertiesRoutes({ model }))
  // app.use('/chat', chatRoutes({ model }))

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log('Server is running on port http://localhost:3000')
  })
}
