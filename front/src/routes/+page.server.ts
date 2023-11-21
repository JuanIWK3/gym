import { error } from '@sveltejs/kit';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../controller/src/trpc/router';

function connectToController(port: number) {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `http://localhost:${port}`
      })
    ]
  });
}

async function isValidConnection(trpc: ReturnType<typeof connectToController>) {
  return await trpc.userList.query().then(() => true).catch(() => false);
}

async function tryConnectToController() {
  let trpc = connectToController(4000);

  // test connection
  if (await isValidConnection(trpc)) {
    console.log("Connected to controller 1");
    return trpc;
  }

  console.log("Could not connect to controller 1");

  trpc = connectToController(4001);

  if (await isValidConnection(trpc)) {
    console.log("Connected to controller 2");
    return trpc;
  }

  console.log("Could not connect to controller 2");
  throw error(500, "Could not connect to any controller");
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  let trpc = await tryConnectToController();

  const users = await trpc.userList.query();
  return ({ users })
}
