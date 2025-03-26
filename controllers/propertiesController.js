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
      const properties = await this.model.getAllProperties({ features, province, city, type })

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
}
