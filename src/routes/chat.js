import express from 'express'
import { Op } from 'sequelize'

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
      const rooms = await model.findAll({
        where: {
          [Op.or]: [{ senderId: userId }, { receiverId: userId }]
        },
        attributes: ['roomId'],
        group: ['roomId']
      })
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
