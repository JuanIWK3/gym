import { UserService } from "./service"

describe('User Service', () => {
  let userService: UserService

  beforeAll(() => {
    userService = new UserService()
  })

  it('should get users', async () => {
    const result = await userService.getUsers()

    expect(result.rows).toBeInstanceOf(Array)
  })

  it('should create a user', async () => {
    await userService.createUser('john')

    const result = await userService.getUserById('john')

    expect(result.rowLength).toBe(1)
  })

  it('should not create a user with the same name', async () => {
    await expect(userService.createUser('john')).rejects.toThrow("User already exists")
  })

  it('should delete a user', async () => {
    await userService.deleteUser('john')

    const result = await userService.getUserById('john')

    expect(result.rowLength).toBe(0)
  })

  it('should not delete a user that does not exist', async () => {
    await expect(userService.deleteUser('john')).rejects.toThrow("User does not exist")
  })
})

