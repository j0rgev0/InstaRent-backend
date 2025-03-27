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
}
