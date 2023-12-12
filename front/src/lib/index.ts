// place files you want to import through the `$lib` alias in this folder.

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../controller/src/trpc/router";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000'
    })
  ]
});

export const getTRPCClient = async () => {
  try {
    await trpc.userList.query()

    console.log("Connected to server 1");

    return trpc
  } catch (error: any) {
    console.log("Failed to connect to server 1, trying server 2");

    const trpc2 = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:4001'
        })
      ]
    });

    try {
      await trpc2.userList.query()

      console.log("Connected to server 2");

      return trpc2
    } catch (error) {
      console.log("Failed to connect to server 2");

      throw new Error('No server available')
    }
  }
}