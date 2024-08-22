import { protectedResolver } from "../../users/user.utils";
import { makeHashtags } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { client, loggedInUser }) => {
        const oldPhoto = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });

        if (!oldPhoto) {
          return {
            ok: false,
            error: "Photo not found.",
          };
        }

        const photo = await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: makeHashtags(caption),
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
