export default {
  Mutation: {
    editProfile: (_, { firstName, lastName, username, email, password }) => {
      console.log(firstName, lastName, username, email, password);
    },
  },
};
