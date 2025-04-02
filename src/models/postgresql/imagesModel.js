import { Images, Properties } from '../../config/db.js'

export class ImagesModel {
  static async getAllImages ({ property }) {
    try {
      const conditions = {}

      if (property) conditions.property_id = property

      const images = await Images.findAll({
        where: conditions
      })

      if (!images) throw new Error('No images found')

      return images
    } catch (e) {
      console.error('Error getting images:', e)
      throw new Error(e.message ?? 'Error getting images')
    }
  }

  static async getImageById (image) {
    try {
      const imageFound = await Images.findOne({
        where: { id: image }
      })

      if (!imageFound) throw new Error('Image not found')

      return imageFound
    } catch (e) {
      console.error('Error getting image by id:', e)
      throw new Error(e.message ?? 'Error getting image by id')
    }
  }

  static async createImage (image) {
    try {
      const property = await Properties.findOne({
        where: { id: image.property_id }
      })

      if (!property) throw new Error('Property not found')

      const imageFound = await Images.findOne({
        where: {
          property_id: image.property_id,
          url: image.url
        }
      })

      if (imageFound) throw new Error(`This property alrady has ${image.url}`)

      const newImage = await Images.create(image)

      if (!newImage) throw new Error('Error creating image')

      return newImage
    } catch (e) {
      console.error('Error creating image:', e)
      throw new Error(e.message ?? 'Error creating image')
    }
  }

  static async updateImage (image) {
    try {
      const property = await Properties.findOne({
        where: { id: image.property_id }
      })

      if (!property) throw new Error('Property not found')
      const imageFound = await Images.findOne({
        where: { id: image.id }
      })

      const existingImage = await Images.findOne({
        where: {
          property_id: image.property_id,
          url: image.url
        }
      })
      if (existingImage) throw new Error(`This property alrady has ${image.url}`)
      if (!imageFound) throw new Error('Image not found')

      await imageFound.update(image)

      return imageFound
    } catch (e) {
      console.error('Error updating propertie:', e)
      throw new Error(e.message ?? 'Error updating image')
    }
  }

  static async deleteImage (id) {
    try {
      const image = await Images.findOne({
        where: { id }
      })

      if (!image) throw new Error('Image not found')

      const result = await image.destroy()

      if (result === 0) throw new Error('Error deleting image')

      return result
    } catch (e) {
      console.error('Error deleting image:', e)
      throw new Error(e.message ?? 'Error deleting image')
    }
  }
}
