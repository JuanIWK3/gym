import { UserController } from ".";
import { UserService } from "../service";
import { describe, expect, test, beforeEach } from "@jest/globals";

describe("User Controller", () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController(new UserService());
  });

  test("should return users", () => {
    expect(userController.getUsers()).toEqual("Get users");
  });

  test("should create user", () => {
    expect(userController.createUser()).toEqual("Create user");
  });

  test("should delete user", () => {
    expect(userController.deleteUser()).toEqual("Delete user");
  });

  test("should add an entry to the user", () => {
    expect(userController.addEntry()).toEqual("Add entry");
  });
})