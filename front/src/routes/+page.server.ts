import { error } from '@sveltejs/kit';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../controller/src/trpc/router';


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:4000'
      })
    ]
  });

  return { users: trpc.userList.query() }
}