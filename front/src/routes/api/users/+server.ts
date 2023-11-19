import { json } from '@sveltejs/kit'
import { trpc } from '$lib'

export async function POST({ request }) {
  const { name } = await request.json()

  try {
    const res = await trpc.userCreate.mutate({ name })
    return json(res)
  } catch (error: any) {
    console.error(error)
    return json({ error: error.message })
  }
}
