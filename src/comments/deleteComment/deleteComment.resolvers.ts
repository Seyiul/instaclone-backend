import { protectedResolver } from "../../users/user.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        });

        if (!comment) {
          return {
            ok: false,
            error: "Comment not found.",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized.",
          };
        } else {
          await client.comment.delete({
            where: { id },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
