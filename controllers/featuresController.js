export class FeaturesController {
  constructor ({ model }) {
    this.model = model
  }

  getAll = async (req, res) => {
    try {
      const features = await this.model.getAllFeatures()
      res.json(features)
    } catch (e) {
      console.error('Error getting features:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }
}
