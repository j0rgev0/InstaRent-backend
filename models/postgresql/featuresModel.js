import { Features } from '../../config/db.js'

export class FeaturesModel {
  static async getAllFeatures () {
    try {
      const features = await Features.findAll()

      if (!features) throw new Error('No features found')

      return features
    } catch (e) {
      console.error('Error getting features:', e)
      throw new Error(e.message ?? 'Error getting features')
    }
  }
}
