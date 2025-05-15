import {
  validateProperty,
  validatePartialProperty
} from '../schemas/properties.js'
export class PropertiesController {
  constructor ({ model }) {
    this.model = model
  }

  getAll = async (req, res) => {
    try {
      const { features } = req.query
      const { province } = req.query
      const { locality } = req.query
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
      const { country } = req.query

      const properties = await this.model.getAllProperties({
        features,
        province,
        locality,
        type,
        condition,
        street,
        constructionYear,
        latitude,
        longitude,
        minPrice,
        maxPrice,
        operation,
        minSize,
        maxSize,
        country
      })

      if (!properties.length) { return res.status(404).json({ message: 'No properties found' }) }

      res.json(properties)
    } catch (e) {
      console.error('Error getting properties:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params
      const property = await this.model.getPropertyById(id)

      if (!property) { return res.status(404).json({ error: 'property not found' }) }

      res.json(property)
    } catch (e) {
      console.error('Error getting property:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  create = async (req, res) => {
    try {
      const result = validateProperty(req.body)

      if (!result.success) {
        throw new Error(
          result.error.errors.map((err) => err.message).join(',')
        )
      }

      const newProperty = await this.model.createProperties(result.data)

      res.status(201).json({
        message: 'Property created successfully',
        property: newProperty
      })
    } catch (e) {
      console.error('Error creating property:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params

      if (!id) { return res.status(400).json({ error: 'Property id is required' }) }

      const result = await this.model.deleteProperties(id)

      if (result === 0) {
        return res
          .status(404)
          .json({ error: 'Property not found or already deleted' })
      }

      res.json({ message: 'Property deleted successfully' })
    } catch (e) {
      console.error('Error deleting property:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  update = async (req, res) => {
    try {
      const { id } = req.params
      const result = validatePartialProperty(req.body)

      if (!result.success) {
        throw new Error(
          result.error.errors.map((err) => err.message).join(',')
        )
      }

      const updatedProperty = await this.model.updateProperties({
        id,
        ...result.data
      })

      if (!updatedProperty) { return res.status(404).json({ error: 'error updating property' }) }

      res.status(200).json({
        message: 'Property updated successfully',
        property: updatedProperty
      })
    } catch (e) {
      console.error('Error editing property:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }
}
