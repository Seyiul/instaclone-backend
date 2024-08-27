require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/user.utils";
import client from "./client";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload-ts";
import logger from "morgan";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";

(async () => {
  try {
    const PORT = process.env.PORT || 4000;

    const app = express();
    const httpServer = createServer(app);
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const apollo = new ApolloServer({
      schema,
      context: async ({ req }) => {
        return {
          loggedInUser: await getUser(req.headers.token),
          client,
        };
      },
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ],
    });

    const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/graphql",
    });

    const serverCleanup = useServer({ schema }, wsServer);

    await apollo.start();

    app.use(graphqlUploadExpress());
    app.use("/static", express.static("uploads"));

    apollo.applyMiddleware({ app });

    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
})();
