import { UserService } from "../service";

export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  public getUsers() {
    return this.userService.getUsers();
  }

  public createUser() {
    return this.userService.createUser();
  }

  public deleteUser() {
    return this.userService.deleteUser();
  }

  public addEntry() {
    return this.userService.addEntry();
  }
}