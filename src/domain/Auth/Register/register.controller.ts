import { Elysia, t } from "elysia";
import { UserModel, UserModelResponses } from "@/models/User/user.model";

import { PrismaService } from "@/lib/prisma";
import { RegisterService } from "./register.service";

export const RegisterController = new Elysia({ name: "RegisterController" });

RegisterController.post(
  "/register",
  async ({ body }) => {
    const registerService = new RegisterService(PrismaService);
    const user = await registerService.register(body);

    const userFormatted = {
      ...user,
      whatsapp: Number(user.whatsapp),
    };

    return {
      message: "Usuário cadastrado com sucesso",
      user: userFormatted,
    };
  },
  {
    body: UserModel.create,
    error: ({ code, set, body }) => {
      if ((code as unknown) === "P2002") {
        set.status = 409;
        return {
          message: `Whatsapp (${body.whatsapp}) já Cadastrado`,
        };
      }
      if (code === "INTERNAL_SERVER_ERROR") {
        set.status = 500;
        return {
          message: "Erro interno do servidor",
        };
      }
    },
    detail: {
      tags: ["Auth"],
      summary: "Cadastro de usuário",
      description: "Registrar um novo usuário",
    },
    response: {
      201: UserModelResponses.created,
      409: t.String({
        format: "error",
        description: "Conflito de cadastro",
        examples: [
          {
            message: "Whatsapp já cadastrado",
          },
        ],
      }),
      422: t.String({
        format: "error",
        description: "Erro de validação",
        examples: [
          {
            message: "Senha deve ter no mínimo 8 caracteres",
          },
        ],
      }),
      500: t.String({
        format: "error",
        description: "Erro interno do servidor",
        examples: [
          {
            message: "Erro interno do servidor",
          },
        ],
      }),
    },
  }
);
