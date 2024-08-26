import { protectedResolver } from "../../users/user.utils";

export default {
  Mutation: {
    deleteMessage: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        const message = await client.message.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
            room: {
              users: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          },
        });

        if (!message) {
          return {
            ok: false,
            error: "Message not found.",
          };
        }

        await client.message.delete({
          where: {
            id,
          },
        });
      }
    ),
  },
};
