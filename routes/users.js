import { Router } from 'express'
import { UsersController } from '../controllers/usersController.js'

export const usersRoutes = ({ model }) => {
  const usersRouter = Router()
  const usersController = new UsersController({ model })

  usersRouter.get('/', usersController.getAll)
  //   usersRouter.get('/:id', usersController.getById)
  usersRouter.patch('/:id', usersController.edit)
  //   usersRouter.delete('/:id', usersController.delete)

  return usersRouter
}
