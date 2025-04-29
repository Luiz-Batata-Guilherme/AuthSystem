import Elysia, { error } from "elysia";

import { JWT_NAME } from "../config/constants";
import jwt from "@elysiajs/jwt";
import { PrismaService as prisma } from "../lib/prisma";

const authPlugin = (app: Elysia) =>
  app
    .use(
      jwt({
        name: JWT_NAME,
        secret: Bun.env.JWT_SECRET!,
      })
    )
    .derive(async ({ jwt, cookie: { accessToken }, set }) => {
      if (!accessToken.value) {
        // handle error for access token is not available
        set.status = "Unauthorized";
        throw error("Unauthorized", {
          message: "Access token is missing",
        });
      }
      const jwtPayload = await jwt.verify(accessToken.value);
      if (!jwtPayload) {
        // handle error for access token is tempted or incorrect
        set.status = "Forbidden";
        throw error("Forbidden", {
          message: "Access token is invalid",
        });
      }

      const userId = jwtPayload.sub;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        // handle error for user not found from the provided access token
        set.status = "Forbidden";
        throw error("Forbidden", {
          message: "Access token is invalid",
        });
      }

      const UserFormated = {
        id: user.id,
        name: user.name,
        gender: user.gender,
        whatsapp: Number(user.whatsapp),
      };

      return {
        user,
        UserFormated,
      };
    });

export { authPlugin };
