//file: `<autoroutes-directory>/some/route.ts`
//url:  `http://your-host/some/route`

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Resource } from 'fastify-autoroutes'

import cassandra from 'cassandra-driver';

const client = new cassandra.Client({
  contactPoints: ['172.23.0.2:9042', '172.23.0.3:9042'],
  localDataCenter: 'cassandra-cluster',
  keyspace: 'ks1',
});

export default (fastify: FastifyInstance) => <Resource>{
  get: {
    handler: async (request: FastifyRequest, reply: FastifyReply) => {
      const query = 'SELECT name, email FROM users WHERE key=?';

      client.execute(query, ['someone'])
        .then(result => console.log('User with email %s', result.rows[0].email));

      reply.send('Get users')
    }
  }
}