import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './trpc/router';

const server = createHTTPServer({
  router: appRouter,
});

server.listen(4000);

console.log('Listening on http://localhost:4000');
