import { UserService } from "./service"
import { FastifyReply, FastifyRequest } from "fastify"

type MyRequest = FastifyRequest<{
  Querystring: { id: string }
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

  createUser = async (request: MyRequest, reply: FastifyReply) => {
    const id = request.query.id

    try {
      return await this.userService.createUser(id)
    } catch (error: any) {
      return reply.send({ error: error.message })
    }
  }

  deleteUser = async (request: MyRequest, reply: FastifyReply) => {
    const id = request.query.id

    try {
      return await this.userService.deleteUser(id)
    } catch (error: any) {
      return reply.send({ error: error.message })
    }
  }
}