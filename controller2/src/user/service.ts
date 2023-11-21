import { client } from "../db";
import { CreateUserInput } from "../types";

export class UserService {
  async getUsers() {
    const result = await client.execute('SELECT * FROM gym.user;')
    return result.rows
  }

  async getUserById(id: string) {
    return await client.execute(`SELECT * FROM gym.user WHERE id = ?;`, [id])
  }

  async getUserByName(name: string) {
    const query = `SELECT * FROM gym.user WHERE name = ? ALLOW FILTERING;`
    return await client.execute(query, [name])
  }

  async createUser(input: CreateUserInput) {
    const user = await this.getUserByName(input.name)

    if (user.rowLength > 0) {
      throw new Error("User already exists")
    }

    const query = `INSERT INTO gym.user (id, name, entrances) VALUES (uuid(), ?, {});`

    return await client.execute(query, [input.name])
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id)

    if (user.rowLength === 0) {
      throw new Error("User does not exist")
    }

    const query = `DELETE FROM gym.user WHERE id = ?;`

    return await client.execute(query, [id])
  }

  async addEntrance(name: string) {
    const user = await this.getUserByName(name)

    if (user.rowLength === 0) {
      throw new Error("User does not exist")
    }

    const id = user.rows[0].id

    const query = `UPDATE gym.user SET entrances = entrances + {'${new Date().toISOString()}'} WHERE id = ?;`

    const res = await client.execute(query, [id])

    return res
  }
}