import { validateImage, validatePartialImage } from '../schemas/images.js'
export class ImagesController {
  constructor ({ model }) {
    this.model = model
  }

  getAll = async (req, res) => {
    try {
      const { property } = req.query
      const images = await this.model.getAllImages({ property })

      res.json(images)
    } catch (e) {
      console.error('Error getting images:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json({ error: 'Image id is required' })

      const image = await this.model.getImageById(id)

      res.json(image)
    } catch (e) {
      console.error('Error getting image by id:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  create = async (req, res) => {
    try {
      const result = validateImage(req.body)

      if (!result.success) throw new Error(result.error.errors.map(err => err.message).join(','))

      const newImage = await this.model.createImage(result.data)

      res.status(201).json({ message: 'Image created successfully', image: newImage })
    } catch (e) {
      console.error('Error creating Image:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  update = async (req, res) => {
    try {
      const { id } = req.params
      const image = req.body

      if (!image) return res.status(400).json({ error: 'Image is required' })

      const result = validatePartialImage(image)

      if (!result.success) throw new Error(result.error.errors.map(err => err.message).join(','))
      if (!id) return res.status(400).json({ error: 'Image id is required' })

      const updatedImage = await this.model.updateImage({ id, ...result.data })

      res.json({
        message: 'Image updated successfully',
        image: updatedImage
      })
    } catch (e) {
      console.error('Error updating image:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json({ error: 'Image id is required' })

      const result = await this.model.deleteImage(id)

      if (!result) return res.status(404).json({ error: 'Image not found' })

      res.json({ message: 'Image deleted successfully' })
    } catch (e) {
      console.error('Error deleting image:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }
}
