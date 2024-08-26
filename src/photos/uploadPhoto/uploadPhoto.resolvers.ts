import { GraphQLUpload } from "graphql-upload-ts";
import { protectedResolver } from "../../users/user.utils";
import { makeHashtags } from "../photos.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { client, loggedInUser }) => {
        let hashtagObj = [];

        if (caption) {
          hashtagObj = makeHashtags(caption);
        }

        const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");

        return client.photo.create({
          data: {
            file: fileUrl,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObj.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
      }
    ),
  },
};
