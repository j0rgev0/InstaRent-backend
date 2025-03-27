import { Router } from 'express'

import { FeaturesController } from '../controllers/featuresController.js'

export const featuresRoutes = ({ model }) => {
  const featuresRouter = Router()
  const featuresController = new FeaturesController({ model })

  featuresRouter.get('/', featuresController.getAll)
  //   featuresRouter.getById('/:id', featuresController.getById)
  //   featuresRouter.create('/new', featuresController.create)
  //   featuresRouter.update('/edit/:id', featuresController.update)
  //   featuresRouter.delete('/delete/:id', featuresController.delete)

  return featuresRouter
}
