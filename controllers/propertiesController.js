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
}
