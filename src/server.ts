import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import express from "express";
import { typeDefs, resolvers } from "./schema";
import { ApolloServer } from "apollo-server-express";
import client from "./client";
import { getUser } from "./users/user.utils";
import { graphqlUploadExpress } from "graphql-upload-ts";

(async () => {
  try {
    const PORT = process.env.PORT || 4000;

    const app = express();
    const httpServer = createServer(app);
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const server = new ApolloServer({
      schema,
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

    const getDynamicContext = async (ctx, msg, args) => {
      if (ctx.connectionParams.token) {
        const loggedInUser = await getUser(ctx.connectionParams.token);
        return { loggedInUser };
      }
      return { loggedInUser: null };
    };

    const serverCleanup = useServer(
      {
        schema,
        context: async (ctx, msg, args) => {
          return getDynamicContext(ctx, msg, args);
        },
      },
      wsServer
    );

    await server.start();

    app.use(graphqlUploadExpress());
    app.use("/static", express.static("uploads"));

    server.applyMiddleware({ app });

    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
})();
