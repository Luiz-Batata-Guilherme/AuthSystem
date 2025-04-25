import Elysia from "elysia";

export const Login = new Elysia({
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

Login.post("/login", "login", {
  detail: {
    summary: "Login",
    description: "Endpoint para login",
  },
});
