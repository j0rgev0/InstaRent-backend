import { DataTypes } from 'sequelize'

export const ImagesModel = (sequelize) => {
  const Images = sequelize.define(
    'images',
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
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      public_id: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  )
  Images.associate = (models) => {
    Images.belongsTo(models.Properties, {
      foreignKey: 'property_id',
      as: 'property'
    })
  }
  return Images
}
