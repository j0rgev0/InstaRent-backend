import { Router } from 'express'

import { UsersController } from '../controllers/usersController.js'

export const userRoutes = ({ model }) => {
  const userRouter = Router()
  const usersController = new UsersController({ model })

  userRouter.get('/', usersController.getAll)
  //   userRouter.post('/', usersController.create)
  //   userRouter.get('/:id', usersController.getById)
  //   userRouter.put('/:id', usersController.update)
  //   userRouter.delete('/:id', usersController.delete)

  return userRouter
}
