import {
  ACCESS_TOKEN_EXP,
  JWT_NAME,
  REFRESH_TOKEN_EXP,
} from "@/config/constants";
import { Elysia, error, t } from "elysia";

import { LoginService } from "./login.service";
import { PrismaService } from "@/lib/prisma";
import { UserModel } from "@/models/User/user.model";
import { getExpTimestamp } from "@/lib/utils";
import jwt from "@elysiajs/jwt";

export const LoginController = new Elysia({ name: "LoginController" }).use(
  jwt({ name: JWT_NAME, secret: Bun.env.JWT_SECRET! })
);

LoginController.post(
  "/login",
  async ({ body, jwt, cookie: { accessToken, refreshToken }, set }) => {
    const loginService = new LoginService(PrismaService);
    const user = await loginService.findUser(body);
    if (!user) {
      return error(401, { message: "Whatsapp não encontrado" });
    }
    const isPasswordValid = await Bun.password.verify(
      body.password,
      user.password,
      "bcrypt"
    );
    if (!isPasswordValid) {
      return error(401, { message: "Whatsapp ou senha inválidos" });
    }

    const accessJWTToken = await jwt.sign({
      sub: user.id,
      exp: getExpTimestamp(ACCESS_TOKEN_EXP),
    });

    accessToken.set({
      value: accessJWTToken,
      httpOnly: true,
      maxAge: ACCESS_TOKEN_EXP,
      path: "/",
    });

    const refreshJWTToken = await jwt.sign({
      sub: user.id,
      exp: getExpTimestamp(REFRESH_TOKEN_EXP),
    });
    refreshToken.set({
      value: refreshJWTToken,
      httpOnly: true,
      maxAge: REFRESH_TOKEN_EXP,
      path: "/",
    });

    const userFormatted = {
      ...user,
      whatsapp: Number(user.whatsapp),
    };

    return {
      message: "Login Efetuado com sucesso",
      data: {
        user: userFormatted,
        accessToken: accessJWTToken,
        refreshToken: refreshJWTToken,
      },
    };
  },
  {
    body: UserModel.login,
    error: ({ code, set }) => {
      if (code === 400) {
        set.status = 400;
        return {
          message: "Erro na requisição",
        };
      }
      if (code === 500) {
        set.status = 500;
        return {
          message: "Erro interno do servidor",
        };
      }
    },
    detail: {
      tags: ["Auth"],
      summary: "Login de usuário",
      description: "Autenticação de usuário com whatsapp e senha",
    },
    response: {
      200: t.Object({
        message: t.String({
          description: "Mensagem de sucesso",
          default: "Login Efetuado com sucesso",
        }),
        data: t.Object({
          user: t.Object({
            id: t.String({ format: "uuid" }),
            name: t.String({
              description: "Nome do usuário",
              default: "Usuário Exemplo",
            }),
            whatsapp: t.Number({
              description: "Número do WhatsApp",
              default: 11999999999,
            }),
          }),
          accessToken: t.String({
            description: "Token de acesso JWT",
            default: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzM......",
          }),
          refreshToken: t.String({
            description: "Token de refresh JWT",
            default: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzM......",
          }),
        }),
      }),
      400: t.Object({
        message: t.String({
          description: "Erro na requisição",
          default: "Erro na requisição",
        }),
      }),
      401: t.Object({
        message: t.String({
          description: "Mensagem de erro",
          examples: {
            message: "Whatsapp ou senha inválidos",
          },
          default: "Whatsapp ou senha inválidos",
        }),
      }),
      500: t.Object({
        message: t.String({
          description: "Erro interno do servidor",
          default: "Erro interno do servidor",
        }),
      }),
    },
  }
);
