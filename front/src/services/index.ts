export const userService = {
  getUsers: async () => {
    const res = await fetch('/api/users');
    return await res.json();
  },

  createUser: async (name: string, pin: string) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, pin
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