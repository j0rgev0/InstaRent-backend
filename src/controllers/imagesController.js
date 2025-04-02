import { validateImage, validatePartialImage } from '../schemas/images.js'
import clouddinary from '../config/cloudinary.js'
import fs from 'fs'

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
      if (!req.file) { return res.status(400).json({ error: 'Image is required' }) }

      const uploadResult = await clouddinary.uploader.upload(req.file.path, {
        folder: 'instarent/properties',
        resource_type: 'image'
      })

      fs.unlinkSync(req.file.path)

      const result = validateImage({
        ...req.body,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id
      })

      if (!result.success) {
        throw new Error(
          result.error.errors.map((err) => err.message).join(',')
        )
      }

      const newImage = await this.model.createImage(result.data)

      res
        .status(201)
        .json({ message: 'Image created successfully', image: newImage })
    } catch (e) {
      console.error('Error uploading image:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  update = async (req, res) => {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json({ error: 'Image id is required' })

      const image = await this.model.getImageById(id)
      if (!image) return res.status(404).json({ error: 'Image not found' })

      const updatedData = { ...req.body }

      if (req.file) {
        await clouddinary.uploader.destroy(image.public_id)

        const uploadResult = await clouddinary.uploader.upload(req.file.path, {
          folder: 'instarent/properties',
          resource_type: 'image'
        })

        await fs.promises.unlink(req.file.path)

        updatedData.url = uploadResult.secure_url
        updatedData.public_id = uploadResult.public_id
      }

      const result = validatePartialImage(updatedData)

      if (!result.success) {
        throw new Error(
          result.error.errors.map((err) => err.message).join(',')
        )
      }

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

      const image = await this.model.getImageById(id)

      if (!image) return res.status(404).json({ error: 'Image not found' })

      await clouddinary.uploader.destroy(image.public_id)

      const result = await this.model.deleteImage(id)

      if (!result) return res.status(404).json({ error: 'Image not found' })

      res.json({ message: 'Image deleted successfully' })
    } catch (e) {
      console.error('Error deleting image:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }
}
