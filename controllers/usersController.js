import { validatePartialUser } from '../schemas/users.js'
export class UsersController {
  constructor ({ model }) {
    this.model = model
  }

  getAll = async (req, res) => {
    try {
      const usersJSON = await this.model.getAllUsers()

      if (!usersJSON.length) {
        return res.status(404).json({ message: 'No users found' })
      }

      res.json(usersJSON)
    } catch (e) {
      console.error('Error getting users:', e)
      res.status(500).json({ error: 'internal server error' })
    }
  }

  edit = async (req, res) => {
    try {
      const { id } = req.params
      const result = validatePartialUser(req.body)
      if (!result.success) throw new Error(result.error.errors.map(err => err.message).join(','))

      const updatedUser = await this.model.edit({ id, ...result.data })

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' })
      }

      res.json(
        {
          message: 'User updated successfull',
          user: updatedUser
        }
      )
    } catch (e) {
      console.error('Error updating user:', e)
      res.status(500).json({ error: e.message ?? 'Internal server error' })
    }
  }
}
