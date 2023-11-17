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
      reply.send(response)
    } catch (error: any) {
      reply.send({ error: error.message })
    }
  }

  getUserByName = async (request: MyRequest, reply: FastifyReply) => {
    const name = request.params.name
    try {
      const response = await this.userService.getUserByName(name)
      reply.send(response)
    } catch (error: any) {
      reply.send({ error: error.message })
    }
  }

  createUser = async (request: MyRequest, reply: FastifyReply) => {
    const { name } = request.body
    console.log(name);


    try {
      return await this.userService.createUser(name)
    } catch (error: any) {
      return reply.send({ error: error.message })
    }
  }

  deleteUser = async (request: MyRequest, reply: FastifyReply) => {
    const id = request.params.id

    try {
      return await this.userService.deleteUser(id)
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