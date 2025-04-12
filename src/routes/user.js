import { Router } from 'express'
import { UserController } from '../controllers/userController.js'

export const userRoutes = ({ model }) => {
  const userRouter = Router()
  const userController = new UserController({ model })

  userRouter.get('/', userController.getAll)
  userRouter.get('/:id', userController.getById)
  userRouter.patch('/edit/:id', userController.update)
  userRouter.delete('/delete/:id', userController.delete)

  return userRouter
}
