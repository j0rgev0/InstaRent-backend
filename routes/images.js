import { Router } from 'express'

import { ImagesController } from '../controllers/imagesController.js'

export const imagesRoutes = ({ model }) => {
  const imagesRouter = Router()
  const imagesController = new ImagesController({ model })

  imagesRouter.get('/', imagesController.getAll)
  imagesRouter.get('/:id', imagesController.getById)
  imagesRouter.post('/new', imagesController.create)
  imagesRouter.patch('/edit/:id', imagesController.update)
  imagesRouter.delete('/delete/:id', imagesController.delete)

  return imagesRouter
}
