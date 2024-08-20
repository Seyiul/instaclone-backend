require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/user.utils";
import client from "./client";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload-ts";
import logger from "morgan";

async function startServer() {
  const PORT = process.env.PORT;
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        client,
      };
    },
  });

  await apollo.start();

  const app = express();
  app.use(graphqlUploadExpress());
  app.use("/static", express.static("uploads"));

  apollo.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
    );
  });
}

startServer();
