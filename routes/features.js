import { Router } from 'express'

import { FeaturesController } from '../controllers/featuresController.js'

export const featuresRoutes = ({ model }) => {
  const featuresRouter = Router()
  const featuresController = new FeaturesController({ model })

  featuresRouter.get('/', featuresController.getAll)
  featuresRouter.get('/:id', featuresController.getById)
  featuresRouter.post('/new', featuresController.create)
  featuresRouter.patch('/edit/:id', featuresController.update)
  //   featuresRouter.delete('/delete/:id', featuresController.delete)

  return featuresRouter
}
