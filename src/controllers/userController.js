import { validatePartialUser } from '../schemas/user.js'

export class UserController {
  constructor ({ model }) {
    this.model = model
  }

  getAll = async (req, res) => {
    try {
      const userJSON = await this.model.getAllUser()

      if (!userJSON.length) {
        return res.status(404).json({ message: 'No user found' })
      }

      res.json(userJSON)
    } catch (e) {
      console.error('Error getting user:', e)
      res.status(500).json({ error: 'internal server error' })
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params
      if (!id) return res.status(400).json({ error: 'User id is required' })

      const user = await this.model.getUserById(id)

      if (!user) return res.status(404).json({ error: 'User not found' })

      res.json(user)
    } catch (e) {
      console.error('Error updating user:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  update = async (req, res) => {
    try {
      const { id } = req.params
      const result = validatePartialUser(req.body)

      if (!result.success) {
        throw new Error(
          result.error.errors.map((err) => err.message).join(',')
        )
      }

      const updatedUser = await this.model.edit({ id, ...result.data })

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.json({
        message: 'User updated successfull',
        user: updatedUser
      })
    } catch (e) {
      console.error('Error updating user:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }

  delete = async (req, res) => {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json({ error: 'User id is required' })

      const result = await this.model.deleteUser(id)

      if (result === 0) {
        return res
          .status(404)
          .json({ error: 'User not found or already deleted' })
      }

      res.json({ message: 'User deleted successfully' })
    } catch (e) {
      console.error('Error deleting user:', e)
      res.status(500).json({ error: e.message })
    }
  }
}
