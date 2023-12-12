import { client } from "../db";
import { CreateUserInput } from "../types";

import * as bcrypt from 'bcrypt';

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

    
    const hashedPin = await bcrypt.hash(input.pin, 10);

    const query = `INSERT INTO gym.user (id, name, entrances, pin) Values (uuid(), ?, {}, ?);`

    return await client.execute(query, [input.name, hashedPin])
  }

  async deleteUser(id: string) {    

    const user = await this.getUserById(id)

    if (user.rowLength === 0) {
      throw new Error("User does not exist")
    }

    const query = `DELETE FROM gym.user WHERE id = ?;`

    return await client.execute(query, [id])
  }

  async addEntrance(name: string, pin: string) {
    const getUserResult = await this.getUserByName(name)

    if (getUserResult.rowLength === 0) {
      throw new Error("User does not exist")
    }

    const user = getUserResult.rows[0]

    if (!await bcrypt.compare(pin, user.get('pin'))) {
      throw new Error('PIN inválido');
    }

    const query = `UPDATE gym.user SET entrances = entrances + {'${new Date().toISOString()}'} WHERE id = ?;`

    const res = await client.execute(query, [user.id])

    return res
  }

  // async verifyPin(pin: any) {    

  //   const currentUser = await this.getUserByName('john');
    
  //   const isPinValid = await bcrypt.compare(pin, currentUser.rows[0].pin);

  //   if (!isPinValid) {
  //     throw new Error('PIN inválido');
  //   }
  // }
}