import { validateProperty, validatePartialProperty } from '../schemas/properties.js'
export class PropertiesController {
  constructor ({ model }) {
    this.model = model
  }

  getAll = async (req, res) => {
    try {
      const { features } = req.query
      const { province } = req.query
      const { city } = req.query
      const { type } = req.query
      const { condition } = req.query
      const { street } = req.query
      const { constructionYear } = req.query
      const { latitude } = req.query
      const { longitude } = req.query
      const { minPrice } = req.query
      const { maxPrice } = req.query
      const { maxSize } = req.query
      const { minSize } = req.query
      const { operation } = req.query

      const properties = await this.model.getAllProperties({ features, province, city, type, condition, street, constructionYear, latitude, longitude, minPrice, maxPrice, operation, minSize, maxSize })

      if (!properties.length) return res.status(404).json({ message: 'No properties found' })

      res.json(properties)
    } catch (e) {
      console.error('Error getting properties:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params
      const propertie = await this.model.getPropertyById(id)

      if (!propertie) return res.status(404).json({ error: 'Propertie not found' })

      res.json(propertie)
    } catch (e) {
      console.error('Error getting propertie:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  create = async (req, res) => {
    try {
      const result = validateProperty(req.body)

      if (!result.success) throw new Error(result.error.errors.map(err => err.message).join(','))

      const newPropertie = await this.model.createProperty(result.data)

      res.status(201).json({
        message: 'Propertie created successfully',
        propertie: newPropertie
      })
    } catch (e) {
      console.error('Error creating propertie:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json({ error: 'Propertie id is required' })

      const result = await this.model.deleteProperty(id)

      if (result === 0) return res.status(404).json({ error: 'User not found or already deleted' })

      res.json({ message: 'User deleted successfully' })
    } catch (e) {
      console.error('Error deleting propertie:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  edit = async (req, res) => {
    try {
      const { id } = req.params
      const result = validatePartialProperty(req.body)

      if (!result.success) throw new Error(result.error.errors.map(err => err.message).join(','))

      

      if (!result.success) throw new Error(result.error.errors.map(err => err.message).join(','))
    } catch (e) {
      console.error('Error editing propertie:', e)
    }
  }
}
