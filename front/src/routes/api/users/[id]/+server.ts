import { trpc } from '$lib';
import { json } from '@sveltejs/kit';

export async function DELETE({ params: { id } }) {

  try {
    const res = await trpc.userDelete.mutate({ id })
    return json(res)
  } catch (error: any) {
    console.error(error)
    return json({ error: error.message })
  }

  return json({})
}