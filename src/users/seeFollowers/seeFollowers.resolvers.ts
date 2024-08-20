import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });

      const totalFollowers = await client.user.count({
        where: {
          following: {
            some: {
              username,
            },
          },
        },
      });

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
