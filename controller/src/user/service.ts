import { client } from "../db";
import { CreateUserInput } from "../types";

//@ts-ignore
import {bcrypt} from "bcrypt";
// const bcrypt = require('bcrypt');

export class UserService {
 
  async getUsers(pin: any) {
    await this.verifyPin(pin);

    const result = await client.execute('SELECT * FROM gym.user;')
    return result.rows
  }

  async getUserById(id: string, pin: any) {
    await this.verifyPin(pin);

    return await client.execute(`SELECT * FROM gym.user WHERE id = ?;`, [id])
  }

  async getUserByName(name: string, pin: any) {
    await this.verifyPin(pin);

    const query = `SELECT * FROM gym.user WHERE name = ? ALLOW FILTERING;`
    return await client.execute(query, [name])
  }

  async createUser(input: CreateUserInput) {
    const user = await this.getUserByName(input.name, '1234')
    
    const pin = Math.floor(Math.random() * 10000)

    const hashedPin = await bcrypt.hash(pin.toString(), 10)

    if (user.rowLength > 0) {
      throw new Error("User already exists")
    }

    const query = `INSERT INTO gym.user (id, name, entrances, pin) VALUES (uuid(), ?, {}, ?);`

    return await client.execute(query, [input.name, hashedPin]  )
  }

  async deleteUser(id: string, pin: any) {    

    const user = await this.getUserById(id, pin)

    if (user.rowLength === 0) {
      throw new Error("User does not exist")
    }

    const query = `DELETE FROM gym.user WHERE id = ?;`

    return await client.execute(query, [id])
  }

  async addEntrance(name: string, pin: any) {
    const user = await this.getUserByName(name, pin)

    if (user.rowLength === 0) {
      throw new Error("User does not exist")
    }

    const id = user.rows[0].id

    const query = `UPDATE gym.user SET entrances = entrances + {'${new Date().toISOString()}'} WHERE id = ?;`

    const res = await client.execute(query, [id])

    return res
  }

  async verifyPin(pin: any) {    

    const currentUser = await this.getUserByName('john' , '1234');
    
    const isPinValid = await bcrypt.compare(pin, currentUser.rows[0].pin);

    if (!isPinValid) {
      throw new Error('PIN inválido');
    }
  }
}