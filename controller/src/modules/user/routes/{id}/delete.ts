//file: `<autoroutes-directory>/some/route.ts`
//url:  `http://your-host/some/route`

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Resource } from 'fastify-autoroutes'

type ParamRequest = FastifyRequest<{ Params: { id: string } }>

export default (fastify: FastifyInstance) => <Resource>{
  delete: {
    handler: async (request: ParamRequest, reply: FastifyReply) => {
      reply.send('Delete user with id: ' + request.params.id)
    }
  }
}