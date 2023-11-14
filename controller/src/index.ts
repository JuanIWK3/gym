import fastify from 'fastify';
const server = fastify()

server.register(require('fastify-autoroutes'), {
  dir: '../modules/user/routes', // relative to your cwd
  prefix: '/api/users'
})

server.listen({ port: 4000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})