import { UserService } from "./service"
import { FastifyReply, FastifyRequest } from "fastify"

type MyRequest = FastifyRequest<{
  Querystring: { id: string }
  Params: { id: string, name: string }
  Body: { name: string }
}>

export class UserController {
  constructor(private readonly userService: UserService) {
  }

  getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const response = await this.userService.getUsers()
      reply.send(response.rows)
    } catch (error: any) {
      reply.send({ error: error.message })
    }
  }

  getUserByName = async (request: MyRequest, reply: FastifyReply) => {
    const name = request.params.name

    try {
      const response = await this.userService.getUserByName(name)
      if (response.rowLength === 0) {
        reply.send({ error: "User does not exist" })
      }
      reply.send(response.rows[0])
    } catch (error: any) {
      reply.send({ error: error.message })
    }
  }

  createUser = async (request: MyRequest, reply: FastifyReply) => {
    const { name } = request.body
    console.log(name);


    try {
      await this.userService.createUser(name)
      reply.send({ message: "User created" })
    } catch (error: any) {
      return reply.send({ error: error.message })
    }
  }

  deleteUser = async (request: MyRequest, reply: FastifyReply) => {
    const id = request.params.id

    try {
      await this.userService.deleteUser(id)
      reply.send({ message: "User deleted" })
    } catch (error: any) {
      return reply.send({ error: error.message })
    }
  }

  addEntrance = async (request: MyRequest, reply: FastifyReply) => {
    const id = request.params.id

    try {
      await this.userService.addEntrance(id)
      reply.send({ message: "Entrance added" })
    } catch (error: any) {
      return reply.send({ error: error.message })
    }
  }
}