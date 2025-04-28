import Elysia from "elysia";
import { RegisterController } from "@/domain/Auth/Register/register.controller";

export const Auth = new Elysia({
  prefix: "/auth",
  detail: {
    tags: ["Auth"],
  },
});

Auth.get(
  "/",
  () => {
    return {
      message: "Rota de Autenticação",
    };
  },
  {
    detail: {
      tags: ["Auth"],
      summary: "Rota de autenticação",
      description:
        "Verifica de a rota de autenticação está funcionando corretamente",
    },
  }
);
Auth.use(RegisterController);
