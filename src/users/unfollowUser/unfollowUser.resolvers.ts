import { protectedResolver } from "../user.utils";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const ok = await client.user.findUnique({ where: { username } });

        if (!ok) {
          return {
            ok: false,
            error: "That user does not exist",
          };
        }

        await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
