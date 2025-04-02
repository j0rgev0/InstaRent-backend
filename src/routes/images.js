import { Router } from 'express'

import { ImagesController } from '../controllers/imagesController.js'
import upload from '../middlewares/upload.js'

export const imagesRoutes = ({ model }) => {
  const imagesRouter = Router()
  const imagesController = new ImagesController({ model })

  imagesRouter.get('/', imagesController.getAll)
  imagesRouter.get('/:id', imagesController.getById)
  imagesRouter.post('/new', upload.single('image'), imagesController.create)
  imagesRouter.patch(
    '/edit/:id',
    upload.single('image'),
    imagesController.update
  )
  imagesRouter.delete('/delete/:id', imagesController.delete)

  return imagesRouter
}
