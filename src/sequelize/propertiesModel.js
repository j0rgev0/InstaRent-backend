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
      type: {
        type: DataTypes.ENUM(
          'apartment',
          'penthouse',
          'chalet',
          'duplex',
          'studio',
          'loft',
          'ruralproperty',
          'groundfloor',
          'townhouse',
          'other'
        ),
        defaultValue: 'other',
        allowNull: false
      },
      operation: {
        type: DataTypes.ENUM('sale', 'rent'),
        defaultValue: 'rent',
        allowNull: false
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      bedrooms: {
        type: DataTypes.INTEGER,
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
      latitude: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      longitude: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false
      },
      street_number: {
        type: DataTypes.STRING,
        allowNull: true
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: false
      },
      locality: {
        type: DataTypes.STRING,
        allowNull: false
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      floor: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      letter: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      condition: {
        type: DataTypes.ENUM(
          'new',
          'excellent',
          'good',
          'fair',
          'to_renovate',
          'ruin'
        ),
        defaultValue: 'good',
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      construction_year: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      furnished: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      video: {
        type: DataTypes.BOOLEAN,
        allowNull: true
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
