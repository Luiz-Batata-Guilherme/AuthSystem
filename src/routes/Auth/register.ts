import Elysia from "elysia";

export const Register = new Elysia({
  prefix: "/auth",
  detail: {
    tags: ["Auth"],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
});

Register.post("/register", "register", {
  detail: {
    summary: "Register",
    description: "Endpoint para registro",
  },
});
