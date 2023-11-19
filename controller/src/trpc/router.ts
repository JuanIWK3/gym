import { z } from "zod";
import { router, publicProcedure } from ".";
import { UserService } from "../user/service";

const userService = new UserService()

export const appRouter = router({
  userList: publicProcedure.query(async () => {
    console.log("get users");

    return await userService.getUsers()
  }),

  userById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await userService.getUserById(input)
  }),

  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return await userService.createUser(input)
    }),

  userDelete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await userService.deleteUser(input.id)
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;