import { Elysia, error, t } from "elysia";
import { UserModel, UserModelResponses } from "@/models/User/user.model";

import { JWT_NAME } from "@/config/constants";
import { LoginService } from "./login.service";
import { PrismaService } from "@/lib/prisma";
import jwt from "@elysiajs/jwt";

export const LoginController = new Elysia({ name: "LoginController" }).use(
  jwt({ name: JWT_NAME, secret: Bun.env.JWT_SECRET! })
);

LoginController.post("/login", async (body) => {});
