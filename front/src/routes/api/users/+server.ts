import { getTRPCClient } from '$lib'
import { json } from '@sveltejs/kit'

const trpc = await getTRPCClient()

export async function POST({ request }) {
  const { name, pin } = await request.json()

  try {
    const res = await trpc.userCreate.mutate({ name, pin })
    return json(res)
  } catch (error: any) {
    console.error(error)
    return json({ error: error.message })
  }
}

export async function GET() {
  try {
    const res = await trpc.userList.query()
    return json(res)
  } catch (error: any) {
    console.error(error)
    return json({ error: error.message })
  }
}