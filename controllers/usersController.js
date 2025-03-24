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
}
