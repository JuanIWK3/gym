//file: `<autoroutes-directory>/some/route.ts`
//url:  `http://your-host/some/route`

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Resource } from 'fastify-autoroutes'

export default (fastify: FastifyInstance) => <Resource>{
  post: {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send('Create user')
    }
  }
}