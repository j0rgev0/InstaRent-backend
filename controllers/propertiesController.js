export class PropertiesController {
  constructor ({ model }) {
    this.model = model
  }

  getAll = async (req, res) => {
    res.json({ message: 'GET all properties' })
  }
}
