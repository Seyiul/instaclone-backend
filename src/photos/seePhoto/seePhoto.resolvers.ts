import client from "../../client";

export default {
  Query: {
    seePhoto: (_, { id }) => {
      return client.photo.findUnique({
        where: {
          id,
        },
      });
    },
  },
};
