import { DataTypes } from 'sequelize'
import { sequelize } from './index.js'

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
      allowNull: false
    },
    receiverId: {
      type: DataTypes.STRING,
      allowNull: false
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

ChatModel.sync()
