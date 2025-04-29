import Elysia, { t } from "elysia";

import { UserModelResponses } from "@/models/User/user.model";
import { authPlugin } from "@/plugins/authPlugin";

export const UserController = new Elysia({
  name: "UserController",
}).use(authPlugin);

UserController.get(
  "/me",
  ({ UserFormated }) => {
    return UserFormated;
  },
  {
    detail: {
      summary: "Informações do usuário",
      description: "Pega as informações do usuário",
      tags: ["User"],
    },
    response: {
      200: UserModelResponses.me,
    },
  }
);
