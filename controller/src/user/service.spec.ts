import { types } from "cassandra-driver";
import { UserService } from "./service"

describe('User Service', () => {
    let userService: UserService
    let createdUser: types.Row;

    beforeAll(() => {
        userService = new UserService()
    })

    it('should get users', async () => {
        const result = await userService.getUsers()

        expect(result.rows).toBeInstanceOf(Array)
    }, 10000)

    it('should create a user', async () => {
        await userService.createUser('john')

        const result = await userService.getUserByName('john')

        createdUser = result.rows[0]

        expect(result.rowLength).toBe(1)
    }, 10000)

    it('should not create a user with the same name', async () => {
        await expect(userService.createUser('john')).rejects.toThrow("User already exists")
    }, 10000)

    it('should delete a user', async () => {
        await userService.deleteUser(createdUser.get('id'))

        const result = await userService.getUserById(createdUser.get('id'))

        expect(result.rowLength).toBe(0)
    }, 10000)

    it('should not delete a user that does not exist', async () => {
        await expect(userService.deleteUser('8602a343-6274-41f5-a0fa-04752b3788f5')).rejects.toThrow("User does not exist")
    }, 10000)
})

