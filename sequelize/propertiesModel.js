import { DataTypes } from 'sequelize'

export const PropertiesModel = (sequelize) => {
  const Properties = sequelize.define(
    'properties',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      furnished: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      size: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      zip_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      construction_year: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      floor: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      video: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
      },
      condition: {
        type: DataTypes.ENUM('new', 'excellent', 'good', 'fair', 'to_renovate', 'ruin'),
        defaultValue: 'good',
        allowNull: false
      },
      operation: {
        type: DataTypes.ENUM('sale', 'rent'),
        defaultValue: 'rent',
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('apartment', 'house', 'office', 'land', 'garage', 'storage', 'room', 'building', 'local', 'other'),
        defaultValue: 'other',
        allowNull: false
      },
      door: {
        type: DataTypes.STRING,
        allowNull: true
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true,
      underscored: true
    }
  )

  Properties.associate = (models) => {
    Properties.hasMany(models.Features, {
      foreingKey: 'property_id',
      as: 'features',
      onDelete: 'CASCADE'
    })
  }
  return Properties
}
