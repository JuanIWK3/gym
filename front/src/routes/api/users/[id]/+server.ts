import { getTRPCClient } from '$lib';
import { json } from '@sveltejs/kit';

export async function DELETE({ params: { id } }) {
  const trpc = await getTRPCClient()

  try {
    const res = await trpc.userDelete.mutate({ id })
    return json(res)
  } catch (error: any) {
    console.error(error)
    return json({ error: error.message })
  }
}