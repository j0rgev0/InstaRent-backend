// import { validateUser } from '../schemas/users'

export class UsersController {
  constructor ({ model }) {
    this.model = model
  }

  getAll = async (req, res) => {
    const usersJSON = await this.model.getAllUsers()

    res.json(usersJSON)
  }
}
