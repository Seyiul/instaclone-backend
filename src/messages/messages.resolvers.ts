import client from "../client";

export default {
  Room: {
    users: ({ id }) =>
      client.user.findMany({
        where: {
          rooms: {
            some: {
              id,
            },
          },
        },
      }),
    messages: ({ id }) =>
      client.message.findMany({
        where: {
          roomId: id,
        },
      }),
    unreadTotal: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          roomId: id,
          read: false,
          user: {
            id: {
              not: loggedInUser.id,
            },
          },
        },
      });
    },
  },

  Message: {
    user: ({ id }) => client.message.findUnique({ where: { id } }).user(),
  },
};
