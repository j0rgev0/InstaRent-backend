import { validateFeature, validatePartialFeature } from '../schemas/features.js'
export class FeaturesController {
  constructor ({ model }) {
    this.model = model
  }

  getAll = async (req, res) => {
    try {
      const { name } = req.query
      const { property } = req.query
      const features = await this.model.getAllFeatures({ name, property })

      res.json(features)
    } catch (e) {
      console.error('Error getting features:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json({ error: 'Feature id is required' })

      const feature = await this.model.getFeatureById(id)

      res.json(feature)
    } catch (e) {
      console.error('Error getting feature by id:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  create = async (req, res) => {
    try {
      const result = validateFeature(req.body)

      if (!result.success) throw new Error(result.error.errors.map(err => err.message).join(','))

      const newFeature = await this.model.createFeature(result.data)

      res.status(201).json({ message: 'Feature created successfully', feature: newFeature })
    } catch (e) {
      console.error('Error creating feature:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  update = async (req, res) => {
    try {
      const { id } = req.params
      const feature = req.body

      if (!feature) return res.status(400).json({ error: 'Feature is required' })

      const result = validatePartialFeature(feature)

      if (!result.success) throw new Error(result.error.errors.map(err => err.message).join(','))
      if (!id) return res.status(400).json({ error: 'Feature id is required' })

      const updatedFeature = await this.model.updateFeature({ id, ...result.data })

      res.json({
        message: 'Feature updated successfully',
        feature: updatedFeature
      })
    } catch (e) {
      console.error('Error updating feature:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json({ error: 'Feature id is required' })

      const result = await this.model.deleteFeature(id)

      if (!result) return res.status(404).json({ error: 'Feature not found' })

      res.json({ message: 'Feature deleted successfully' })
    } catch (e) {
      console.error('Error deleting feature:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }
}
