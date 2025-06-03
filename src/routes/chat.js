import express from 'express'
import { Op } from 'sequelize'
import { User } from '../config/db.js'

export const chatRoutes = ({ model }) => {
  const router = express.Router()

  router.get('/:roomId', async (req, res) => {
    try {
      const { roomId } = req.params
      const messages = await model.findAll({
        where: { roomId },
        order: [['createdAt', 'ASC']]
      })
      res.json(messages)
    } catch (error) {
      console.error('Error fetching messages:', error)
      res.status(500).json({ error: 'Error fetching messages' })
    }
  })

  router.get('/rooms/:userId', async (req, res) => {
    try {
      const { userId } = req.params

      const uniqueRooms = await model.findAll({
        attributes: ['roomId'],
        where: {
          [Op.or]: [{ senderId: userId }, { receiverId: userId }]
        },
        group: ['roomId']
      })

      const rooms = await Promise.all(
        uniqueRooms.map(async ({ roomId }) => {
          const lastMessage = await model.findOne({
            where: { roomId },
            order: [['createdAt', 'DESC']],
            attributes: ['roomId', 'senderId', 'receiverId'],
            include: [
              {
                model: User,
                as: 'sender',
                foreignKey: 'senderId',
                attributes: ['id', 'name', 'image', 'emailVerified']
              },
              {
                model: User,
                as: 'receiver',
                foreignKey: 'receiverId',
                attributes: ['id', 'name', 'image', 'emailVerified']
              }
            ]
          })
          return lastMessage
        })
      )

      res.json(rooms)
    } catch (error) {
      console.error('Error fetching rooms:', error)
      res.status(500).json({ error: 'Error fetching rooms' })
    }
  })

  router.get('/unread/:userId', async (req, res) => {
    try {
      const { userId } = req.params
      const unreadMessages = await model.findAll({
        where: {
          receiverId: userId,
          read: false
        }
      })
      res.json(unreadMessages)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  router.put('/read/:roomId', async (req, res) => {
    try {
      const { roomId } = req.params
      const { userId } = req.body
      await model.update(
        { read: true },
        {
          where: {
            roomId,
            receiverId: userId,
            read: false
          }
        }
      )
      res.json({ message: 'Messages marked as read' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

  return router
}
