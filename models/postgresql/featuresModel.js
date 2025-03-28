import { Features } from '../../config/db.js'

export class FeaturesModel {
  static async getAllFeatures ({ name, property }) {
    try {
      const conditions = {}

      if (name) conditions.name = name

      if (property) conditions.property_id = property

      const features = await Features.findAll({
        where: conditions
      })

      if (!features) throw new Error('No features found')

      return features
    } catch (e) {
      console.error('Error getting features:', e)
      throw new Error(e.message ?? 'Error getting features')
    }
  }

  static async getFeatureById (feature) {
    try {
      const featureFound = await Features.findOne({
        where: { id: feature }
      })

      if (!featureFound) throw new Error('Feature not found')

      return featureFound
    } catch (e) {
      console.error('Error getting feature by id:', e)
      throw new Error(e.message ?? 'Error getting feature by id')
    }
  }

  static async createFeature (feature) {
    try {
      const featureFound = await Features.findOne({
        where: {
          property_id: feature.property_id,
          name: feature.name.toLowerCase()
        }
      })

      if (featureFound) throw new Error(`This property alrady has ${feature.name}`)

      const newFeature = await Features.create({
        ...feature,
        name: feature.name?.toLowerCase() ?? feature.name
      })

      if (!newFeature) throw new Error('Error creating feature')

      return newFeature
    } catch (e) {
      console.error('Error creating feature:', e)
      throw new Error(e.message ?? 'Error creating feature')
    }
  }

  static async updateFeature (feature) {
    try {
      const featureFound = await Features.findOne({
        where: { id: feature.id }
      })

      const existingFeature = await Features.findOne({
        where: {
          property_id: feature.property_id,
          name: feature.name?.toLowerCase() ?? feature.name
        }
      })
      if (existingFeature) throw new Error(`This property alrady has ${feature.name}`)
      if (!featureFound) throw new Error('Feature not found')

      await featureFound.update({
        ...feature,
        name: feature.name?.toLowerCase() ?? featureFound.name
      })

      return featureFound
    } catch (e) {
      console.error('Error updating propertie:', e)
      throw new Error(e.message ?? 'Error updating feature')
    }
  }
}
