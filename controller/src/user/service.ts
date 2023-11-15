import { types } from "cassandra-driver";
import { client } from "../db";

export class UserService {
  async getUsers() {
    return await client.execute('SELECT * FROM gym.user;')
  }

  async getUserById(id: string) {
    return await client.execute(`SELECT * FROM gym.user WHERE userid = '${id}';`)
  }

  async createUser(id: string) {
    const user = await this.getUserById(id)

    if (user.rowLength > 0) {
      throw new Error("User already exists")
    }

    return await client.execute("INSERT INTO gym.user (userid) VALUES ('john');")
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id)

    if (user.rowLength === 0) {
      throw new Error("User does not exist")
    }

    return await client.execute("DELETE FROM gym.user WHERE userid = 'john';")
  }
}