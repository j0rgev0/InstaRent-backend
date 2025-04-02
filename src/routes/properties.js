import { Router } from 'express'
import { PropertiesController } from '../controllers/propertiesController.js'
export const propertiesRoutes = ({ model }) => {
  const propertiesRouter = Router()
  const propertiesController = new PropertiesController({ model })

  propertiesRouter.get('/', propertiesController.getAll)
  propertiesRouter.get('/:id', propertiesController.getById)
  propertiesRouter.post('/new', propertiesController.create)
  propertiesRouter.patch('/edit/:id', propertiesController.update)
  propertiesRouter.delete('/delete/:id', propertiesController.delete)

  return propertiesRouter
}
