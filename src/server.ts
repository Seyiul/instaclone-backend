require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/user.utils";
import client from "./client";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload-ts";
import cors from "cors";
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        client,
      };
    },
  });
  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: [
        "https://www.your-app.example",
        "https://studio.apollographql.com",
      ],
    }),
    express.json(),
    graphqlUploadExpress()
  );

  server.applyMiddleware({ app });

  await new Promise<void>((r) => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
