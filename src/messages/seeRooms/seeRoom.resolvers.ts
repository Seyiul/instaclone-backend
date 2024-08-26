import { protectedResolver } from "../../users/user.utils";

export default {
  Query: {
    seeRooms: protectedResolver(async (_, __, { client, loggedInUser }) =>
      client.room.findMany({
        where: {
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};
