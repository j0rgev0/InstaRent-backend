import { DataTypes } from 'sequelize'
import { sequelize } from './index.js'
import { User } from '../config/db.js'

export const ChatModel = sequelize.define(
  'Chat',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    receiverId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: true,
    underscored: true
  }
)

// Definir las relaciones
ChatModel.belongsTo(User, {
  foreignKey: 'senderId',
  as: 'sender'
})

ChatModel.belongsTo(User, {
  foreignKey: 'receiverId',
  as: 'receiver'
})

ChatModel.sync()
