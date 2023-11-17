import Fastify from "fastify";

import { client } from "./db";
import { UserService } from "./user/service";
import { UserController } from "./user/controller";

const server = Fastify();

const userService = new UserService();


const userController = new UserController(userService);

server.get("/", userController.getUsers);
server.get("/:name", userController.getUserByName);
server.post("/create", userController.createUser);
server.delete("/:id", userController.deleteUser);
server.post("/enter/:id", userController.addEntrance);

server.listen({ port: 4000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
})

