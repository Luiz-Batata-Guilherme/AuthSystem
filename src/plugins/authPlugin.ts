import Elysia, { error } from "elysia";

import { JWT_NAME } from "../config/constants";
import { convertToLocalDate } from "@/lib/utils";
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
          message: "Acesso não autorizado",
        });
      }
      const jwtPayload = await jwt.verify(accessToken.value);
      if (!jwtPayload) {
        // handle error for access token is tempted or incorrect
        set.status = "Forbidden";
        throw error("Forbidden", {
          message: "Token de acesso é inválido",
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
          message: "Token de acesso é inválido",
        });
      }

      const UserFormated = {
        id: user.id,
        role: user.role,
        name: user.name,
        gender: user.gender,
        whatsapp: Number(user.whatsapp),
        createdAt: convertToLocalDate(user.createdAt),
        updatedAt: convertToLocalDate(user.updatedAt),
      };

      return {
        user,
        UserFormated,
      };
    });

export { authPlugin };
