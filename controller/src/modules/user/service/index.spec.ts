import { UserService } from ".";
import { describe, it, expect, test, beforeEach } from "@jest/globals";

describe("userService", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  })

  test("should return users", () => {
    expect(userService.getUsers()).toEqual("Get users");
  })

  test("should create user", () => {
    expect(userService.createUser()).toEqual("Create user");
  })

  test("should delete user", () => {
    expect(userService.deleteUser()).toEqual("Delete user");
  })

  test("should add an entry to the user", () => {
    expect(userService.addEntry()).toEqual("Add entry");
  })
})