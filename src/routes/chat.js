import { Router } from 'express'

export const chatRoutes = ({ model }) => {
  const router = Router()

  router.get('/:roomId', async (req, res) => {
    try {
      const { roomId } = req.params
      const messages = await model.findAll({
        where: { roomId },
        order: [['createdAt', 'ASC']]
      })
      res.json(messages)
    } catch (error) {
      res.status(500).json({ error: error.message })
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
