import { DataTypes } from 'sequelize'

export const FeaturesModel = (sequelize) => {
  const Features = sequelize.define(
    'features',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      property_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'properties',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  )
  Features.associate = (models) => {
    Features.belongsTo(models.Properties, {
      foreignKey: 'property_id',
      as: 'property'
    })
  }
  return Features
}
