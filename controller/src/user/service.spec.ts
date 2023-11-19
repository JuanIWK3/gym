import { types } from "cassandra-driver";
import { UserService } from "./service"
import { client } from "../db";
import { CreateUserInput } from "../types";

describe('User Service', () => {
    let userService: UserService
    let createdUser: types.Row;

    const createUserInput: CreateUserInput = {
        name: 'john'
    }

    beforeAll(async () => {
        userService = new UserService()
        await client.execute('TRUNCATE gym.user')
    })

    it('should get users', async () => {
        const result = await userService.getUsers()

        expect(result).toBeInstanceOf(Array)
    }, 10000)

    it('should create a user', async () => {
        await userService.createUser(createUserInput)

        const result = await userService.getUserByName(createUserInput.name)

        createdUser = result.rows[0]

        expect(result.rowLength).toBe(1)
    }, 10000)

    it('should not create a user with the same name', async () => {
        await expect(userService.createUser(createUserInput)).rejects.toThrow("User already exists")
    }, 10000)

    it('should delete a user', async () => {
        await userService.deleteUser(createdUser.get('id'))

        const result = await userService.getUserById(createdUser.get('id'))

        expect(result.rowLength).toBe(0)
    }, 10000)

    it('should not delete a user that does not exist', async () => {
        await expect(userService.deleteUser('8602a343-6274-41f5-a0fa-04752b3788f5')).rejects.toThrow("User does not exist")
    }, 10000)

    it('should add an entrance', async () => {
        await userService.createUser(createUserInput)

        const user = await userService.getUserByName(createUserInput.name)

        await userService.addEntrance(user.rows[0].get('id').toString())

        const result = await userService.getUserByName(createUserInput.name)

        expect(result.rows[0].get('entrances')).toHaveLength(1)

        console.log(result.rows[0].get('entrances'));


        await userService.deleteUser(result.rows[0].get('id'))
    })

    it('should not add an entrance to a user that does not exist', async () => {
        await expect(userService.addEntrance('8602a343-6274-41f5-a0fa-04752b3788f5')).rejects.toThrow("User does not exist")
    })
})

