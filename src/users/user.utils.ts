import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";
import { GraphQLResolveInfo } from "graphql";
export const getUser = async (token) => {
  try {
    if (!token) {
      console.log("KOKOKOK");

      return null;
    }
    const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY);
    if ("id" in verifiedToken) {
      const user = await client.user.findUnique({
        where: { id: verifiedToken["id"] },
      });
      if (user) {
        return user;
      }
    }
    return null;
  } catch {
    return null;
  }
};

export function protectedResolver(ourResolver: Resolver) {
  return function (
    root: any,
    args: any,
    context: any,
    info: GraphQLResolveInfo
  ) {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please log in to perform this action",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
}
