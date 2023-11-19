export const userService = {

  createUser: async (name: string) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name
      })
    });

    return await res.json();
  },

  deleteUser: async (id: string) => {
    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });

    return await res.json();
  }
}