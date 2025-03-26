export class PropertiesController {
  constructor ({ model }) {
    this.model = model
  }

  getAll = async (req, res) => {
    try {
      const properties = await this.model.getAllProperties()

      if (!properties.length) return res.status(404).json({ message: 'No properties found' })

      res.json(properties)
    } catch (e) {
      console.error('Error getting properties:', e)
      res.status(500).json({ error: 'internal server error' })
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params
      const propertie = await this.model.getAllProperties(id)

      if (!propertie) return res.status(404).json({ error: 'Propertie not found' })
    } catch (e) {
      console.error('Error getting propertie:', e)
      res.status(500).json({ error: 'internal server error' })
    }
  }
}
