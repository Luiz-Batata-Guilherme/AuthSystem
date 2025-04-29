import Elysia from "elysia";
import { UserController } from "@/domain/User/user.controller";

export const User = new Elysia({
  prefix: "/user",
  detail: {
    tags: ["User"],
  },
});

User.get(
  "/",
  () => {
    return {
      message: "Rota do Usuário",
    };
  },
  {
    detail: {
      tags: ["User"],
      summary: "Rota do usuário",
      description:
        "Verifica de a rota de usuário está funcionando corretamente",
    },
  }
);
User.use(UserController);
